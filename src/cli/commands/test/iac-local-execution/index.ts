import { loadFiles } from './file-loader';
import { parseFiles } from './file-parser';
import { scanFiles } from './file-scanner';
import { formatScanResults } from './results-formatter';
import { isLocalFolder } from '../../../../lib/detect';
import {
  IacOptionFlags,
  IacFileParsed,
  IacFileParseFailure,
  SafeAnalyticsOutput,
} from './types';
import { initLocalCache } from './local-cache';
import { addIacAnalytics } from './analytics';

// this method executes the local processing engine and then formats the results to adapt with the CLI output.
// the current version is dependent on files to be present locally which are not part of the source code.
// without these files this method would fail.
// if you're interested in trying out the experimental local execution model for IaC scanning, please reach-out.
export async function test(pathToScan: string, options: IacOptionFlags) {
  await initLocalCache();
  const filesToParse = await loadFiles(pathToScan);
  const { parsedFiles, failedFiles } = await parseFiles(filesToParse);
  const scannedFiles = await scanFiles(parsedFiles);
  const formattedResults = formatScanResults(scannedFiles, options);
  addIacAnalytics(formattedResults);

  if (isLocalFolder(pathToScan)) {
    // TODO: This mutation is here merely to support how the old/current directory scan printing works.
    // NOTE: No file or parsed file data should leave this function.
    options.iacDirFiles = [...parsedFiles, ...failedFiles].map(
      removeFileContent,
    );
  }

  // TODO: add support for proper typing of old TestResult interface.
  return formattedResults as any;
}

export function removeFileContent({
  filePath,
  fileType,
  failureReason,
  projectType,
}: IacFileParsed | IacFileParseFailure): SafeAnalyticsOutput {
  return {
    filePath,
    fileType,
    failureReason,
    projectType,
  };
}

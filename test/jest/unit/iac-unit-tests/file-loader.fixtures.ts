import * as path from 'path';

const fileContent = 'dont-care';
const mixedDirectory = path.join(__dirname, 'mixed');

export const k8sDirectory = path.join(__dirname, 'kubernetes', 'files');
export const emptyDirectory = path.join(__dirname, 'empty-dir');
export const k8sFileStub = {
  fileContent,
  filePath: path.join(k8sDirectory, 'k8s.yaml'),
  fileType: 'yaml',
};

export const anotherK8sFileStub = {
  ...k8sFileStub,
  filePath: path.join(k8sDirectory, 'pod.yaml'),
};

export const terraformDirectory = path.join(__dirname, 'terraform', 'files');

export const terraformFileStub = {
  fileContent,
  filePath: path.join(terraformDirectory, 'main.tf'),
  fileType: 'tf',
};

export const anotherTerraformFileStub = {
  ...terraformFileStub,
  filePath: path.join(terraformDirectory, 'modules.tf'),
};

export const nonIacFileStub = {
  fileContent,
  filePath: path.join(mixedDirectory, 'this_shouldnt_load.sh'),
  fileType: 'sh',
};

export const anotherNonIacFileStub = {
  fileContent,
  filePath: path.join(mixedDirectory, 'this_also_shouldnt_load.js'),
  fileType: 'js',
};

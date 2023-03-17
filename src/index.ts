import { generateResume } from './gen-resume-5';

generateResume().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);

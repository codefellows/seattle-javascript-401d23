'use strict';

const logger = require('./lib/logger');
const fileReader = require('./lib/file-reader');

const litanyPath = `${__dirname}/assets/litany.txt`;
const ulyssesPath = `${__dirname}/assets/ulysses.txt`;
const mobyDickPath = `${__dirname}/assets/moby-dick.txt`;
const sherlockPath = `${__dirname}/assets/sherlock.txt`;
const prideAndPrejudicePath = `${__dirname}/assets/pride-and-pred.txt`;

const printCharacters = (characters) => {
  console.log(characters);
  console.log('--------------------------------------------');
};
const CHARACTERS = 256;
//------------------------------------------------------------------------
// Naive Execution
//------------------------------------------------------------------------
// try {
//   fileReader.readFirstNCharactersAsync(
//     ulyssesPath, CHARACTERS,
//     (ulysses) => {
//       printCharacters(ulysses);
//     },
//   );
//   fileReader.readFirstNCharactersAsync(
//     litanyPath, CHARACTERS,
//     (litany) => {
//       printCharacters(litany);
//     },
//   );
// } catch (error) {
//   logger.log(logger.ERROR, error);
// }
//------------------------------------------------------------------------
// Forcing Sequential Execution
//------------------------------------------------------------------------
// try {
//   fileReader.readFirstNCharactersAsync(
//     ulyssesPath, CHARACTERS,
//     (ulysses) => {
//       // Vinicio - I know this line will not run UNTIL I read the first file
//       printCharacters(ulysses);
//
//       // Vinicio - Main difference!
//       fileReader.readFirstNCharactersAsync(
//         litanyPath, CHARACTERS,
//         (litany) => {
//           printCharacters(litany);
//         },
//       );
//     },
//   );
// } catch (error) {
//   logger.log(logger.ERROR, error);
// }
//------------------------------------------------------------------------
// What if we had 5 files? - Callback Hell
//------------------------------------------------------------------------
// try {
//   fileReader.readFirstNCharactersAsync(ulyssesPath, CHARACTERS, (ulysses) => {
//     printCharacters(ulysses);
//     fileReader.readFirstNCharactersAsync(litanyPath, CHARACTERS, (litany) => {
//       printCharacters(litany);
//       fileReader.readFirstNCharactersAsync(mobyDickPath, CHARACTERS, (moby) => {
//         printCharacters(moby);
//         fileReader.readFirstNCharactersAsync(sherlockPath, CHARACTERS, (sherlock) => {
//           printCharacters(sherlock);
//           fileReader.readFirstNCharactersAsync(prideAndPrejudicePath, CHARACTERS, (pride) => {
//             printCharacters(pride);
//           });
//         });
//       });
//     });
//   });
// } catch (error) {
//   logger.log(logger.ERROR, error);
// }
//------------------------------------------------------------------------
// What if we had X files? and we need to avoid Callback Hell
//------------------------------------------------------------------------

const files = [mobyDickPath, ulyssesPath, sherlockPath];

// Vinicio - callback will be executed once I finish ALL my async operations
const readFileArrayAsync = (fileArray, currentIndex, callback) => {
  if (currentIndex >= fileArray.length) {
    // Vinicio - returning callback's execution, not just callback
    return callback();
  }
  const currentFilePath = fileArray[currentIndex];
  try {
    return fileReader.readFirstNCharactersAsync(currentFilePath, CHARACTERS, (file) => {
      printCharacters(file);
      readFileArrayAsync(fileArray, currentIndex + 1, callback);
    });
  } catch (error) {
    logger.log(logger.ERROR, error);
  }
  return undefined;
};

readFileArrayAsync(files, 0, () => logger.log(logger.INFO, 'We have read all the files'));

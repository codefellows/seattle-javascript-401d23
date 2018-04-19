const parseBitmap = module.exports = {};

parseBitmap.parse = (buffer) => {
  // TODO: ADD ERROR CHECKS
  const parsedBitmap = {};
  const FILE_SIZE_OFFSET = 2;
  const HEIGHT_OFFSET = 22;
  const COLOR_TABLE_OFFSET = 54; // Starts at position 55
  const COLOR_TABLE_SIZE = 1000;
  //------------------------------------------------------
  // READING INFORMATION FROM THE BITMAP FILE
  //------------------------------------------------------
  parsedBitmap.type = buffer.toString('utf-8', 0, 2);
  // Vinicio - 4 bytes * 8 = 32 bits
  parsedBitmap.fileSize = buffer.readInt32LE(FILE_SIZE_OFFSET);
  parsedBitmap.height = buffer.readInt32LE(HEIGHT_OFFSET);
  parsedBitmap.colorTable = buffer.slice(COLOR_TABLE_OFFSET,COLOR_TABLE_SIZE);

  return parsedBitmap;
};

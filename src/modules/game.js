export default class Game {

  constructor(ctx) {
    var level = new Array();
    this.initializeLevel(level);
    this.ctx = ctx;

    var currentBlock;
    var play = false;
    var gameStepTime = 370;
    var cumulatedFrameTime = 0;
    var lastFrameTime = Date.now();
    var numberOfLines = 0;

    setInterval(loop, 33);
  }

  initializeLevel(level) {
    for(var y=0; y<20; y++)
    {
      level[y] = new Array();
      for(var x=0; x<10; x++)
      {
        level[y][x] = " ";
      }
    }
  }

  loop() {
    if(true) {
      var time = Date.now();
      frameTime = time - lastFrameTime;
      lastFrameTime = time;
      cumulatedFrameTime += frameTime;

      while(cumulatedFrameTime > gameStepTime) {
        if(checkOffset(currentBlock,0,1) == true) {
          currentBlock.y++;
        }
        else {
          writeToArray(currentBlock);
          addRandomBlock();
        }

        checkAndRemoveFullLines();
        cumulatedFrameTime -= gameStepTime;
      }
    }
    else {
      lastFrameTime = Date.now();
    }
    ctx.clearRect(0, 0, _canvas_width, _canvas_height);
    drawArrayBlocks();
    drawBlock(currentBlock);
  }
}

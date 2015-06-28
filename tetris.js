var canvas;
var ctx;
var level;
var currentBlock;
var play = false;
var gameStepTime = 370;
var frametime = 0;
var cumulatedFrameTime = 0;
var lastFrameTime = Date.now();
var numberOfLines = 0;

function startGame()
{
    canvas = document.getElementById('tetrisCanvas');
    $('#score').html("Number of lines: "+numberOfLines + " <br /> Difficulty : " + gameStepTime + "ms");
    
    if (canvas.getContext)
    { 
        addEvents();
        
        ctx = canvas.getContext('2d');
        initializeLevel();
        
        addRandomBlock();

        function loop()
        {
            if(play == true)
            {                
                var time = Date.now();
                frameTime = time - lastFrameTime;
                lastFrameTime = time;
                cumulatedFrameTime += frameTime; 
            
                while(cumulatedFrameTime > gameStepTime) 
                {
                    if(checkOffset(currentBlock,0,1) == true)
                    {
                        currentBlock.y++;
                    }
                    else
                    {
                        writeToArray(currentBlock);
                        addRandomBlock();
                    }
                    
                    checkAndRemoveFullLines();
                    
                    cumulatedFrameTime -= gameStepTime;
                }            
            }
            else
            {
                lastFrameTime = Date.now();
            }
            ctx.clearRect(0, 0, _canvas_width, _canvas_height);
            drawArrayBlocks();
            drawBlock(currentBlock);  
        }
        setInterval(loop, 33);       
    }
    else
    {
        alert('You need Safari or Firefox 1.5+ to play tetris!');
    }
}

function writeToArray(block)
{
    for(var y=0; y<4; y++)
    {
        for (var x = 0; x < 4; x++)
        {
            if(block.array[y][x] == 1)
            {
                var fieldX = block.x + x;
                var fieldY = block.y + y;
                level[fieldY][fieldX] = block.type;                
            }
        }
    }
}

function checkOffset(block, offsetX, offsetY)
{
    for(var y=0; y<4; y++)
    {
        for(var x = 0; x < 4; x++)
        {
            if(block.array[y][x] == 1)
            {
                var fieldX = block.x + x;
                var fieldY = block.y + y;
                if(ocupied(fieldX+offsetX, fieldY+offsetY) == true)
                {
                    return false;
                }
            }
        }
    }
    return true;
}

function ocupied(x, y)
{
    if(y>=20)
        return true;
    if(x<0)
        return true;
    if(x>10)
        return true;
    
    if(level[y][x] != ' ')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function drawBlock(block)
{
    for(var y=0; y<4; y++)
    {
        for (var x = 0; x < 4; x++)
        {
            if(block.array[y][x] == 1)
            {
                ctx.fillStyle = block.getOuterColor();
                ctx.fillRect((block.x+x)*_block_width,(block.y+y)*_block_width,_block_width,_block_width);
                ctx.fillStyle = block.getInnerColor();
                ctx.fillRect((block.x+x)*20+_blockedges,(block.y+y)*20+_blockedges,_block_width-_blockedges*2,_block_width-_blockedges*2);
            }
        }
    }
}

function drawArrayBlocks()
{
    for(var y=0; y<20; y++)
    {
        for(var x=0; x<10; x++)
        {
            if (level[y][x] != " ")
            {
                ctx.fillStyle = blockEdgecolor;
                ctx.fillRect(x*_block_width,y*_block_width,_block_width,_block_width);
                if(level[y][x] == "I")
                    ctx.fillStyle = I_color;
                else if(level[y][x] == "J")
                    ctx.fillStyle = J_color
                else if(level[y][x] == "L")
                    ctx.fillStyle = L_color
                else if(level[y][x] == "O")
                    ctx.fillStyle = O_color
                else if(level[y][x] == "S")
                    ctx.fillStyle = S_color
                else if(level[y][x] == "T")
                    ctx.fillStyle = T_color
                else if(level[y][x] == "Z")
                    ctx.fillStyle = Z_color;                
                ctx.fillRect(x*_block_width+_blockedges,y*_block_width+_blockedges,_block_width-_blockedges*2,_block_width-_blockedges*2);
            }
        }
    }
}

function addEvents()
{
    document.addEventListener('keydown', keydown, false);
}

function keydown(ev) 
{
    switch(ev.keyCode) 
    {
        case 34: 
            if(carryMode)
            {
                if(checkOffset(currentBlock,-1,0) == true)
                {
                    currentBlock.x--;      
                }
            }
        case 37: 
            if(!carryMode)
            {
                if(checkOffset(currentBlock,-1,0) == true)
                {
                    currentBlock.x--;      
                } 
            }                  
            break;
        case 39: 
            if(checkOffset(currentBlock,+1,0) == true)
            {
                currentBlock.x++;      
            }  
            break;
        case 38: 
        currentBlock.rotate(level);
            break;
        case 40: 
            if(checkOffset(currentBlock,0,+1) == true)
            {
                currentBlock.y = currentBlock.y + 1;
            }
            break;
    }
}

function initializeLevel()
{
    level = new Array();
    for(var y=0; y<20; y++)
    {
        level[y] = new Array();
        for(var x=0; x<10; x++)
        {
            level[y][x] = " ";
        }
    }
}

function addRandomBlock()
{
    var randomnumber = Math.floor(Math.random()*7)
    if(randomnumber == 0)
    currentBlock = new TetrisBlock("O", 3, 0);
    else if(randomnumber == 1)
    currentBlock = new TetrisBlock("I", 3, 0);
    else if(randomnumber == 2)
    currentBlock = new TetrisBlock("Z", 3, 0);
    else if(randomnumber == 3)
    currentBlock = new TetrisBlock("L", 3, 0);
    else if(randomnumber == 4)
    currentBlock = new TetrisBlock("J", 3, 0);
    else if(randomnumber == 5)
    currentBlock = new TetrisBlock("S", 3, 0);
    else if(randomnumber == 6)
    currentBlock = new TetrisBlock("T", 3, 0);
}

function checkAndRemoveFullLines()
{
    for(var i=0; i<20; i++)
    {
        var fullLine = true;
        
        for(var x=0; x<10; x++)
        {
            if(level[i][x] == " ")
            {
                fullLine = false;
            }
        }
        
        if(fullLine == true)
        {
            numberOfLines++;
            gameStepTime = gameStepTime * 0.99;
            $('#score').html("Number of lines: "+numberOfLines + " <br />Difficulty : " + parseInt(gameStepTime) + "ms");
            removeLine(i);   
        }
    }
}

function removeLine(from)
{
    for(var i = from; i>0; i--)
    {
        for(var x=0; x<10; x++)
        {
            var waardeBovenVakje = level[i-1][x];
            level[i][x] =  waardeBovenVakje;
        }
    }
}
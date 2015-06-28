function TetrisBlock(type, x, y)
{
    this.type = type;
    this.x = x;
    this.y = y;

    if(type == "Z")
    {
        this.array = Z0;
        var state = "Z0";
    }
    else if(type == "I")
    {
        this.array = I0;
        var state = "I0";
    }
    else if(type == "O")
    {
        this.array = O0;
        var state = "O0";
    }
    else if(type == "L")
    {
        this.array = L0;
        var state = "L0";
    }
    else if(type == "J")
    {
        this.array = J0;
        var state = "J0";
    }
    else if(type == "S")
    {
        this.array = S0;
        var state = "S0";
    }
    else if(type == "T")
    {
        this.array = T0;
        var state = "T0";
    }
    
    this.getInnerColor = function()
    {
        if(type == "I")
            return I_color;
        else if(type == "J")
            return J_color;
        else if(type == "L")
            return L_color;
        else if(type == "O")
            return O_color;
        else if(type == "S")
            return S_color;
        else if(type == "T")
            return T_color;
        else if(type == "Z")
            return Z_color;
    }
    
    this.getOuterColor = function()
    {
        return blockEdgecolor;
    }
    
    this.rotate = function(level)
    {
        if(type == "I")
        {
            if(state == "I0")
            {
                if(rotateAlowed(I1, level, this.x, this.y))
                {
                    this.array = I1;
                    state = "I1"; 
                }
            }
            else if (state == "I1")
            {
                if(rotateAlowed(I2, level, this.x, this.y))
                {
                    this.array = I2;
                    state = "I2";
                }
            }
            else if(state == "I2")
            {
                if(rotateAlowed(I3, level, this.x, this.y))
                {
                    this.array = I3;
                    state = "I3";    
                }
            }
            else if (state == "I3")
            {
                if(rotateAlowed(I0, level, this.x, this.y))
                {
                    this.array = I0;
                    state = "I0";     
                }
            }
        }
        
        else if(type == "Z")
        {
            if(state == "Z0")
            {
                if(rotateAlowed(Z1, level, this.x, this.y))
                {
                    this.array = Z1;
                    state = "Z1";        
                }
            }
            else if (state == "Z1")
            {
                if(rotateAlowed(Z2, level, this.x, this.y))
                {
                    this.array = Z2;
                    state = "Z2";
                }
            }
            else if(state == "Z2")
            {
                if(rotateAlowed(Z3, level, this.x, this.y))
                {
                    this.array = Z3;
                    state = "Z3";     
                }
            }
            else if (state == "Z3")
            {
                if(rotateAlowed(Z0, level, this.x, this.y))
                {
                    this.array = Z0;
                    state = "Z0";
                }
            }
        }
        
        if(type == "O")
        {
        }
        
        if(type == "L")
        {
            if(state == "L0")
            {
                if(rotateAlowed(L1, level, this.x, this.y))
                {
                    this.array = L1;
                    state = "L1"; 
                }
            }
            else if (state == "L1")
            {
                if(rotateAlowed(L2, level, this.x, this.y))
                {
                    this.array = L2;
                    state = "L2";
                }
            }
            else if(state == "L2")
            {
                if(rotateAlowed(L3, level, this.x, this.y))
                {
                    this.array = L3;
                    state = "L3";    
                }
            }
            else if (state == "L3")
            {
                if(rotateAlowed(L0, level, this.x, this.y))
                {
                    this.array = L0;
                    state = "L0";     
                }
            }
        }
        
        if(type == "J")
        {
            if(state == "J0")
            {
                if(rotateAlowed(J1, level, this.x, this.y))
                {
                    this.array = J1;
                    state = "J1"; 
                }
            }
            else if (state == "J1")
            {
                if(rotateAlowed(J2, level, this.x, this.y))
                {
                    this.array = J2;
                    state = "J2";
                }
            }
            else if(state == "J2")
            {
                if(rotateAlowed(J3, level, this.x, this.y))
                {
                    this.array = J3;
                    state = "J3";    
                }
            }
            else if (state == "J3")
            {
                if(rotateAlowed(J0, level, this.x, this.y))
                {
                    this.array = J0;
                    state = "J0";     
                }
            }
        }
        
        if(type == "S")
        {
            if(state == "S0")
            {
                if(rotateAlowed(S1, level, this.x, this.y))
                {
                    this.array = S1;
                    state = "S1"; 
                }
            }
            else if (state == "S1")
            {
                if(rotateAlowed(S2, level, this.x, this.y))
                {
                    this.array = S2;
                    state = "S2";
                }
            }
            else if(state == "S2")
            {
                if(rotateAlowed(S3, level, this.x, this.y))
                {
                    this.array = S3;
                    state = "S3";    
                }
            }
            else if (state == "S3")
            {
                if(rotateAlowed(S0, level, this.x, this.y))
                {
                    this.array = S0;
                    state = "S0";     
                }
            }
        }
        
        if(type == "T")
        {
            if(state == "T0")
            {
                if(rotateAlowed(T1, level, this.x, this.y))
                {
                    this.array = T1;
                    state = "T1"; 
                }
            }
            else if (state == "T1")
            {
                if(rotateAlowed(T2, level, this.x, this.y))
                {
                    this.array = T2;
                    state = "T2";
                }
            }
            else if(state == "T2")
            {
                if(rotateAlowed(T3, level, this.x, this.y))
                {
                    this.array = T3;
                    state = "T3";    
                }
            }
            else if (state == "T3")
            {
                if(rotateAlowed(T0, level, this.x, this.y))
                {
                    this.array = T0;
                    state = "T0";     
                }
            }
        }
    }
    
    function rotateAlowed(newPositions, level, blockx, blocky)
    {
        for(var searchY=0; searchY<4; searchY++)
        {
            for (var searchX = 0; searchX < 4; searchX++)
            {
                if(newPositions[searchY][searchX] == 1)
                {
                    var x2 = blockx + searchX;
                    var y2 = blocky + searchY;
                    if(x2>10)
                    {
                        return false;
                    }
                    else if(y2>20)
                    {
                        return false;
                    }
                    
                    else if(level[y2][x2] != " ")
                    {
                        return false;
                    }                 
                }
            }
        }
        return true;
    }
}


(function() {
    
    
    var RW = 110;
    
    var canvas = null;
    
    function draw(walks) {
        
        var ctx = canvas.getContext("2d");
        
        var h = canvas.width/(RW+3);
        
        for ( let rw = 0 ; rw < walks.length ; rw++) {
            
            var walk = walks[rw];
            
            ctx.strokeStyle = nextColor();
            
            var y = canvas.height/2
            ctx.moveTo(h, y);
            
            for ( let i = 0 ; i < walk.length ; i++ ) {
                
                y = y + walk[i]*h;
                ctx.lineTo((i+2)*h, y);
                
            }
            
            ctx.stroke();
            
        }
    }
    
    
    window.onload = function() {
        
        canvas = document.getElementsByTagName("canvas")[0];
        
//        ctx = canvas.getContext("2d");
        
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        
//        ctx.fillStyle = 'red';
//        ctx.fillRect(0,0,canvas.width, canvas.height);
//        
        var walks = []
        
        for ( let i = 0 ; i < 10 ; i++ ) {
            walks.push(random_walk(RW));
            console.log(JSON.stringify(walks[0]));
        }
        
        draw(walks);
        
    }
    
    
    function nextColor() {
        
        return "#"+((1<<24)*Math.random()|0).toString(16);
    }
    
    
})()
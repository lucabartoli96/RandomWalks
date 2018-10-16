

(function() {
    
    
    /**
     * Parametri delle passeggiate aleatorie
     */
    var N = 300, //lunghezza passeggiata
        W = 20;  //numero passeggiate
    
    /**
     *  Costanti animazione
     */
    var DELAY = 10;
    
    /**
     * Varibili che memorizzano i cammini
     */
    var walks = [];
    
    /**
     *  Variabili legate a disegno e animazione
     */    
    var canvas, ctx, drawnX;
    var animate = true;
    var colors = [];

    
    
    
    /**
     *
     */
    function draw_plane(H, y) {
        
        ctx.beginPath();
        ctx.moveTo(1, 0);
        ctx.lineTo(1, canvas.height);
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        
        
        ctx.beginPath();
        
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
        
        console.log(H);
        
        if ( H < 5 ) {
            let times = Math.floor(5/H);
            H = H*times;
        }
        
        console.log(H);
        
        
        
        for ( let j = 1; j*H <= y; j++) {
            ctx.moveTo(0, y-j*H);
            ctx.lineTo(canvas.width, y-j*H);
            ctx.moveTo(0, y+j*H);
            ctx.lineTo(canvas.width, y+j*H);
        }
        
        for ( let i = 1; i*H < canvas.width ; i++ ) {
            ctx.moveTo(i*H, 0);
            ctx.lineTo(i*H, canvas.height);
        }
        
        ctx.stroke();
    }
    
    /**
     *  Funzione che disegna il grafico, animando se è la prima volta
     */
    function draw() {
        
        var H = canvas.width/N;
        
        var y = canvas.height/2,
            v = new Array(W).fill(y);
        
        draw_plane(H, y);
        
        
        if ( colors.length === 0 ) {
            for ( let i = 0 ; i < W ; i++) {
                colors.push("#"+((1<<24)*Math.random()|0).toString(16)); //random color
            }
        } 
        
        
        ctx.lineWidth = 1.5;
        
        if ( animate ) {
            
            var s = 0;
        
            var handle = setInterval(function() {

                for ( let i = 0 ; i < W ; i++ ) {

                    var from_x = s*H,
                        from_y = v[i],
                        to_x   = (s+1)*H,
                        to_y   = v[i] + walks[i][s]*H;

                    ctx.beginPath();
                    ctx.strokeStyle = colors[i];
                    ctx.moveTo(from_x, from_y);
                    ctx.lineTo(to_x, to_y);
                    ctx.stroke();

                    v[i] = to_y;
                }

                s++;

                if ( s === N ) {
                    clearInterval(handle);
                }

            }, DELAY);
            
        } else {
            
            for ( let i = 0 ; i < W ; i++ ) {

                var walk = walks[i];
                                
                ctx.beginPath();
                ctx.strokeStyle = colors[i];
                ctx.moveTo(0, y);

                for ( let s = 1 ; s < N; s++ ) {

                    y = y + walk[s]*H;
                    ctx.lineTo(s*H, y);
                }

                ctx.stroke();
                
                y = canvas.height/2;

            }
            
        }
        
    }
    
    
    function refresh() {
        
        walks = []
        
        for ( let i = 0 ; i < W ; i++ ) {
            walks.push(random_walk(N));
        }
        
        draw();
    }
    
    
    window.onload = function() {
        
        canvas = document.getElementsByTagName("canvas")[0];
        ctx = canvas.getContext("2d");
        
        canvas.width = document.body.clientWidth-200;
        canvas.height = document.body.clientHeight-50;
        
        refresh();
        
    }
    
    
})()
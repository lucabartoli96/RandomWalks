

(function() {
    
    
    /**
     * Parametri delle passeggiate aleatorie
     */
    var N = 30, //lunghezza passeggiata
        W = 10,  //numero passeggiate
        K = 5; //altro parametro
    
    /**
     *  Costanti animazione
     */
    var TIME = 400;
    
    /**
     * Varibili che memorizzano i cammini
     */
    var walks = [];
    
    /**
     *  Variabili legate a disegno e animazione
     */    
    var canvas, ctx, drawnX, handle;
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
        
        if ( H < 5 ) {
            let times = Math.ceil(5/H);
            H = H*times;
        }
        
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
    
    
    function init_colors() {
        
        if ( colors.length === 0 ) {
            for ( let i = 0 ; i < W ; i++) {
                //random color
                colors.push("#"+((1<<24)*Math.random()|0).toString(16)); 
            }
        } 
    }
    
    function draw_step(H, v, s) {
        
        for ( let i = 0 ; i < W ; i++ ) {

            var from_x = s*H,
                from_y = v[i],
                to_x   = (s+1)*H,
                to_y   = v[i] - walks[i][s]*H;

            ctx.beginPath();
            ctx.strokeStyle = colors[i];
            ctx.moveTo(from_x, from_y);
            ctx.lineTo(to_x, to_y);
            ctx.stroke();

            v[i] = to_y;
        }
    }
    
    
    /**
     *  Funzione che disegna il grafico, animando se è la prima volta
     */
    function draw() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        var H = canvas.width/N;
        
        var y = canvas.height/2,
            v = new Array(W).fill(y);
        
        draw_plane(H, y);
        init_colors();
        
        ctx.lineWidth = 1.5;
        
        var delay = TIME/N;
        
        if ( delay < 1 ) {
            delay = 0.01;
        }
            
        var s = 0;

        handle = setInterval(function() {

            draw_step(H, v, s);
            s++;

            if ( s === N ) {
                clearInterval(handle);
                handle = null;
                compute_statistics();
            }

        }, delay);
        
    }
    
    
    function refresh() {
        
        if ( handle !== null ) {
            clearInterval(handle);
        }
        
        ctx.strokeStyle = "rgb(0, 0, 0)";
        colors = [];
        walks = []
        
        for ( let i = 0 ; i < W ; i++ ) {
            walks.push(random_walk(N));
        }
        
        draw();
    }
    
    
    function compute_statistics() {
        
        var tbody = document.getElementsByTagName("tbody")[0];

        var html = "";
        
        statList.forEach(function(stat) {
            
            html += 
                "<tr>" + 
                    "<td>" + stat.msg(N/2, K) + "</td>" + 
                    "<td>" + stat.law(N/2, K) + "</td>" + 
                    "<td>" + stat.experiment(walks, K) + "</td>" + 
                "</tr>";
            
        });
        
        tbody.innerHTML = html;
        
    }
    
    
    window.onload = function() {
        
        canvas = document.getElementsByTagName("canvas")[0];
        ctx = canvas.getContext("2d");
        
        canvas.width = canvas.parentNode.clientWidth-200;
        canvas.height = canvas.parentNode.clientHeight-50;
        
        var inputN = document.getElementsByName("N")[0],
            inputW = document.getElementsByName("W")[0],
            inputK = document.getElementsByName("K")[0],
            lengthP = document.getElementById("length"),
            kP = document.getElementById("k"),
            submitted = function(event) {
            
                if ( event ) {
                    event.preventDefault();
                }
                
                N = 2*Number(inputN.value);
                lengthP.innerHTML = N;
                W = Number(inputW.value);
                
                
                K = Number(inputK.value);
                kP.innerHTML = 2*K;
                
                refresh();
                
        };
        
        
        inputN.addEventListener("input", function() {
            lengthP.innerHTML = 2*Number(inputN.value);
            
            if ( Number(inputK.value) > Number(inputN.value) ) {
                inputK.value = Number(inputN.value);
            }
            
            inputK.max = Number(inputN.value)
            kP.innerHTML = 2*Number(inputK.value);
            
        });
        
        inputK.addEventListener("input", function() {
            kP.innerHTML = 2*Number(inputK.value);
        });
        
        if ( Number(inputK.value) > Number(inputN.value) ) {
            inputK.value = Number(inputN.value);
        }

        inputK.max = Number(inputN.value)
        kP.innerHTML = 2*Number(inputK.value);
        
        document.getElementsByTagName("form")[0]
            .addEventListener("submit", submitted);
        
        submitted();
    }
    
    
})()
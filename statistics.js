

/**
 *  NB: Le camminate sono indicizzate da 0 sulla matrice "walks"
 *      mentre gli indici sono pensati da 1 sulle formule
 */

var statList = (function() {
    
    var list = [];
    
    
    function binomial(n, k) {
        
        var coeff = 1;
        
        for ( let x = n-k+1 ; x <= n ; x++ ) {
            coeff *= x;
        }
        
        for ( let x = 1 ; x <= k ; x++ ) {
            coeff /= x;
        }
        
        return coeff;
    }
    
    function u_2(k) {
        
        var num = binomial(2*k, k),
            den = Math.pow(2, 2*k);
        
        return num/den;
    }
    
    function f_2(k) {
        return u_2(k-1)/(2*k);
    }
    
    
    /**
     * Positivo eccetto che in 2m
     */
    list.push({
        
        "msg" : function(m) {
            
            var msg = "P(S<sub>1</sub>&gt;0,";
            
            if ( m > 1 ) {
                msg += "... , S<sub>" + (2*m-1) + "</sub>&gt;0, ";
            }
            
            return msg + " S<sub>" + (2*m) + "</sub>=0)";
        },
        "law" : function(m) {
            
            var num = (1/m)*binomial(2*m-2, m-1),
                den = Math.pow(2, 2*m);
            
            return num/den;
        },
        
        "experiment" : function(walks) {
            
            var num = 0;
            
            for ( let i = 0 ; i < walks.length ; i++ ) {
                
                var walk = walks[i],
                    s = 1,
                    val = walk[0];
                
                for (s = 1; s < walk.length && val > 0; s++ ) {
                    val += walk[s];
                }
                
                if ( s === walk.length && val ===0 ) {
                    num++;
                }
                
            }
            
            return num/walks.length;
            
        }
        
    });
    
    
    
    /**
     * Uguale a 0 al tempo 2m
     */
    list.push({
        
        "msg" : function(m) {
            
            return " P(S<sub>" + (2*m) + "</sub>=0)";
        },
        "law" : function(m) {
            return u_2(m);
        },
        "experiment" : function(walks) {
            
            var num = 0;
            
            for ( let i = 0 ; i < walks.length ; i++ ) {
                
                var walk = walks[i],
                    val = 0;
                
                for (let s = 0; s < walk.length ; s++ ) {
                    val += walk[s];
                }
                
                if ( val ===0 ) {
                    num++;
                }
                
            }
            
            return num/walks.length;
            
        }
        
    });
    
    
    
    /**
     * Diverso da 0 eccetto che al tempo 2m
     */
    list.push({
        
        "msg" : function(m) {
            
            var msg = "P(S<sub>1</sub>&ne;0,";
            
            if ( m > 1 ) {
                msg += "... , S<sub>" + (2*m-1) + "</sub>&ne;0, ";
            }
            
            return msg + " S<sub>" + (2*m) + "</sub>=0)";
        },
        "law" : function(m) {
            return f_2(m);
        },
        "experiment" : function(walks) {
            
            var num = 0;
            
            for ( let i = 0 ; i < walks.length ; i++ ) {
                
                var walk = walks[i],
                    s = 1,
                    val = walk[0];
                
                for (s = 1; s < walk.length && val !== 0; s++ ) {
                    val += walk[s];
                }
                
                if ( s === walk.length && val === 0 ) {
                    num++;
                }
                
            }
            
            return num/walks.length;
            
        }
        
    });
    
    
    
    
    /**
     * Sempre diverso da 0
     */
    list.push({
        
        "msg" : function(m) {
            
            var msg = "P(S<sub>1</sub>&ne;0,";
            
            if ( m > 1 ) {
                msg += "... , S<sub>" + (2*m-1) + "</sub>&ne;0, ";
            }
            
            return msg + " S<sub>" + (2*m) + "</sub>&ne;0)";
        },
        "law" : function(m) {
            return u_2(m);
        },
        "experiment" : function(walks) {
            
            var num = 0;
            
            for ( let i = 0 ; i < walks.length ; i++ ) {
                
                var walk = walks[i],
                    s = 1,
                    val = walk[0];
                
                for (s = 1; s < walk.length && val !== 0; s++ ) {
                    val += walk[s];
                }
                
                if ( s === walk.length && val !== 0 ) {
                    num++;
                }
                
            }
            
            return num/walks.length;
            
        }
        
    });
    
    
    
    
     /**
     * Sempre maggiore e minore al tempo 2m-1
     */
    list.push({
        
        "msg" : function(m) {
            
            var msg = "P(";
            
            if ( m > 1 ) {
                msg += "S<sub>1</sub>&ge;0,";
                
                if ( m > 2) {
                    msg += "... ,"; 
                }
                
                msg += "S<sub>" + (2*m-2) + "</sub>&ge;0, ";
            }
            
            return msg + " S<sub>" + (2*m-1) + "</sub>&lt;0)";
        },
        "law" : function(m) {
            return f_2(m);
        },
        "experiment" : function(walks) {
            
            var num = 0;
            
            for ( let i = 0 ; i < walks.length ; i++ ) {
                
                var walk = walks[i],
                    s = 1,
                    val = walk[0];
                
                for (s = 1; s < walk.length-1 && val >= 0; s++ ) {
                    val += walk[s];
                }
                
                if ( s === walk.length-1 && val < 0 ) {
                    num++;
                }
                
            }
            
            return num/walks.length;
            
        }
        
    });
    
    
    
    /**
     * Probabilità che sia 0 al tempo 2k per l'ultima volta
     */
    list.push({
        
        "msg" : function(m, k) {
            
            var msg = "P(S<sub>" + (2*k) + "</sub>=0, ";
            
            msg += "S<sub>" + (2*k+1) + "</sub>:&gt;0";
            
            
//            if ( m > 1 ) {
//                msg += "S<sub>1</sub>&ge;0,";
//                
//                if ( m > 2) {
//                    msg += "... ,"; 
//                }
//                
//                msg += "S<sub>" + (2*m-2) + "</sub>&ge;0, ";
//            }
            
            msg += "... ,"; 
            
            return msg + " S<sub>" + (2*m) + "</sub>&gt;0)";
        },
        "law" : function(m, k) {
            return u_2(k)*u_2(m-k);
        },
        "experiment" : function(walks, k) {
            
            var num = 0;
            
            k = k-0.5; // Per il problema che sulle formule sono indicizzati da 1
                     // e la matrice da 0
            
            for ( let i = 0 ; i < walks.length ; i++ ) {
                
                var walk = walks[i],
                    s = 0,
                    val = 0;
                
                for (s = 0; s <= 2*k ; s++ ) {
                    val += walk[s];
                }
                
                if ( val === 0 ) {
    
                    val += walk[2*k+1]; 
                    
                    for (s = 2*k+2; s < walk.length && val > 0 ; s++ ) {
                        val += walk[s];
                    }
                    
                    if ( s === walk.length && val > 0 ) {
                        num++;
                    }
                
                }
                
                
                
//                for (s = 0; s < walk.length && (s !== 2*k || val === 0) &&  (s <= 2*k || val > 0) ; s++ ) {
//                    val += walk[s];
//                }
                
//                if ( s === walk.length && val > 0 ) {
//                    num++;
//                }
                
            }
            
            return num/walks.length;
            
        }
        
    });
    
    
    
    return list;
    
    
})();
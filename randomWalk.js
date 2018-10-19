

var random_walk = ( function () {

    function E() {
        return Math.round(Math.random() * 1);
    }

    function X() {
        return 2*E()-1;
    }

    return function (n) {
        var walk = [];
        
        for ( let i = 0; i < n ; i++ ) {
            
            walk.push(X())
            
        }
        
        return walk;
    }
    
})();
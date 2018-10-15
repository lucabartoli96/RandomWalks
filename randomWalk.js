


    function bernoulli_trial() {
        return Math.round(Math.random() * 1);
    }

    function random_step() {
        return 2*bernoulli_trial()-1;
    }

    function random_walk(n) {
        var walk = [];
        
        for ( let i = 0; i < n ; i++ ) {
            
            walk.push(random_step())
            
        }
        
        return walk
    }
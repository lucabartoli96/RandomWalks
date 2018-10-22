(function() {
    
    
    var FORM = function(path) { return "html/" + path + "/form.html"},
        MAIN = function(path) { return "html/" + path + "/main.html"},
        CSS  = function(path) { return "<link class='temp_css'" + 
                                        " href='css/" + path + ".css'>"},
        JS   = function(path) { return "<script  src='js/" + path + "/main.js' ></script>"}
        
    
    function load( path , callback ) {
        var client = new XMLHttpRequest();
        client.open('GET', path);
        client.onreadystatechange = function() {
            callback(client.responseText);
        }
        client.send();
    }
    
    function createNode(string) {
        var div = document.createElement('div');
        div.innerHTML = string.trim();
        return div.firstChild; 
    }
    
    window.onload = function() {
        
        var form = document.getElementsByTagName("form")[0],
            select = document.getElementsByTagName("select")[0],
            section = document.getElementsByTagName("section")[0],
            main = document.getElementsByTagName("main")[0];
        
        
        
        var selected = function ( path ) {
        
            var links = document.getElementsByClassName("temp_css");

            while ( links.length ) document.head.removeChild(links[0]);
            
            document.head.appendChild(createNode(CSS(path)));

            load(FORM(path), function(text) {

                section.innerHTML = text;
                
                 load(MAIN(path), function(text) {

                    main.innerHTML = text;

                });

            });
            
             document.head.appendChild(createNode(JS(path)));
            
        } 
        
        
        form.addEventListener("submit", function(evt) { evt.preventDefault() });
        select.addEventListener("change", function(evt) { selected(select.value) });
        
        selected("sim_rand_walks");
         
    }
    
})();
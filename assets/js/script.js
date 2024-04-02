$(document).ready(function () {
    let searchButton = $("#searchButton");
    let inputHeroId = $("#inputHeroId");
    let patron = /^[1-9][0-9]*$/;
    
    
    function validateId(id){        
        return patron.test(id);       
    }

    searchButton.click(function () {
        console.log(validateId(inputHeroId.val()));
    });
    



});
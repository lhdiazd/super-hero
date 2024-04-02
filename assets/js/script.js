$(document).ready(function () {
    let searchButton = $("#searchButton");
    let inputHeroId = $("#inputHeroId");
    let patron = /^[1-9][0-9]*$/;
    

    function getSuperHeroId(inputElement){        
        return inputElement.val();
    }
    
    function validateSuperHeroId(id){        
        return patron.test(id);       
    }



    searchButton.click(function () {
        console.log(getId(inputHeroId));
    });
    



});
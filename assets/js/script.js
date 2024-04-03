$(document).ready(function () {
    let searchHeroSection = $("#searchHeroSection");
    let resultSection = $("#resultSection");
    let searchButton = $("#searchButton");
    let inputHeroId = $("#inputHeroId");
    let patron = /^[1-9][0-9]*$/;
    

    function getSuperHeroId(inputElement){        
        return inputElement.val();
    }
    
    function validateSuperHeroId(id){        
        return patron.test(id);       
    }

    function showSuperHeroData(response){
        $("#superHeroImg").attr("src", response.image.url);
        $("#superHeroName").text(response.name);
        $("#superHeroConnections").text(response.connections['group-affiliation']);
        $("#superHeroPublisher").text(response.biography.publisher);
        $("#superHeroOccupation").text(response.work.occupation);
        
    }

    function fetchSuperHero(superheroId) {
        let superHeroapiUrl = 'https://www.superheroapi.com/api.php/4905856019427443/' + superheroId;

        $.ajax({
            url: superHeroapiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                searchHeroSection.toggle();
                resultSection.toggle();
                showSuperHeroData(response);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    }



    searchButton.click(function () {
        let superHeroId = getSuperHeroId(inputHeroId);
        let isValidId = validateSuperHeroId(superHeroId);

        if(isValidId){
            fetchSuperHero(superHeroId);
        } else {
            alert("El formato de ID no es válido, favor ingresar solo valores númericos mayores a 0");
            return;
        }
    });
    



});
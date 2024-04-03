$(document).ready(function () {
    let searchHeroSection = $("#searchHeroSection");
    let resultSection = $("#resultSection");
    let searchButton = $("#searchButton");
    let inputHeroId = $("#inputHeroId");
    let searchAgainSection = $("#searchAgainSection");
    let searchAgainButton = $("#searchAgainButton");
    let errorSection = $("#errorSection");
    let patron = /^[1-9][0-9]*$/;


    function getSuperHeroId(inputElement) {
        return inputElement.val();
    }

    function validateSuperHeroId(id) {
        return patron.test(id);
    }

    function showSearchSection() {
        searchHeroSection.show();
        resultSection.hide();
        searchAgainSection.hide();
        errorSection.hide();
    }

    function showResultSection() {
        searchHeroSection.hide();
        resultSection.show();
        searchAgainSection.show();
        errorSection.hide();
    }

    function showErrorSection() {
        searchAgainSection.show();
        errorSection.show();
        searchHeroSection.hide();
        resultSection.hide();
    }

    function showSuperHeroData(response) {
        $("#superHeroImg").attr("src", response.image ? response.image.url : "---------");
        $("#superHeroName").text(response.name || ""); 
        $("#superHeroConnections").text(response.connections && response.connections["group-affiliation"] ? response.connections["group-affiliation"] : "");
        $("#superHeroPublisher").text(response.biography && response.biography.publisher ? response.biography.publisher : ""); 
        $("#superHeroOccupation").text(response.work && response.work.occupation ? response.work.occupation : "");
        $("#superHeroFirstAppearance").text(response.biography && response.biography["first-appearance"] ? response.biography["first-appearance"] : "");
        $("#superHeroHeight").text(response.appearance && response.appearance.height ? response.appearance.height : ""); 
        $("#superHeroWeight").text(response.appearance && response.appearance.weight ? response.appearance.weight : ""); 
        $("#superHeroAliases").text(response.biography && response.biography.aliases ? response.biography.aliases.join(" ") : ""); 
    }


    

    function fetchSuperHero(superheroId) {
        let superHeroapiUrl = 'https://www.superheroapi.com/api.php/4905856019427443/' + superheroId;
        $.ajax({
            url: superHeroapiUrl,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response && response.response === "error") {
                    showErrorSection();
                } else {
                    showResultSection();
                    showSuperHeroData(response);

                    let dataPoints = [];

                    for (let property in response.powerstats) {
                        if (response.powerstats.hasOwnProperty(property)) {
                            let value = parseInt(response.powerstats[property]);
                            if (!isNaN(value)) {
                                dataPoints.push({ label: property, y: value });
                            }
                        }
                    }

                    let options = {
                        title: {
                            text: "Estadísticas de poder para " + response.name
                        },
                        data: [{
                            type: "pie",
                            startAngle: 45,
                            showInLegend: true,
                            legendText: "{label}",
                            indexLabel: "{label} ({y})",                            
                            dataPoints: dataPoints
                        }]
                    };
                    
                    $("#chartContainer").CanvasJSChart(options);
                }
            },
            error: function (error) {
                console.log(error);
                showErrorSection();
            }
        });
    }



    searchButton.click(function () {
        let superHeroId = getSuperHeroId(inputHeroId);
        let isValidId = validateSuperHeroId(superHeroId);

        if (isValidId) {
            fetchSuperHero(superHeroId);
        } else {
            alert("El formato de ID no es válido, favor ingresar solo valores númericos mayores a 0");
            return;
        }
    });

    searchAgainButton.click(function () {
        inputHeroId.val("");
        showSearchSection();
    });




});
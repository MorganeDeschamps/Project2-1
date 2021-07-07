function convertTmData (TmObject) {


    let newObject = {};

    newObject.name = TmObject.name;
    newObject.type = [TmObject.type];
    newObject.urlForTickets = TmObject.url;
    newObject.img = TmObject.images[0].url;
    newObject.owner = "Ticketmaster";
    

    newObject.description = TmObject.description ? TmObject.description : "";

    newObject.date = {
        date: TmObject.dates.start.localDate ? TmObject.dates.start.localDate : "",
        time: TmObject.dates.start.localTime ? TmObject.dates.start.localTime : "" 
    }



    if(TmObject.classifications) {
        newObject.tags = [
            TmObject.classifications[0].segment.name, 
            TmObject.classifications[0].genre.name, 
            TmObject.classifications[0].subGenre.name
        ];
    } else {
        console.log("issue with ID: ", TmObject.id)
        newObject.tags = "";
    }


    if(TmObject._embedded) {

        if(TmObject._embedded.venues) {
            newObject.location = {
                venueName: TmObject._embedded.venues[0].name,
                city: TmObject._embedded.venues[0].city.name,
                country: TmObject._embedded.venues[0].country.name
            };
        } else {
            newObject.location = {
                venueName: "",
                city: "",
                country: ""
            };
            console.log("issue with ID: ", TmObject.id)
        }

    
  
    
        if(TmObject._embedded.attractions && TmObject._embedded.attractions[0].externalLinks && TmObject._embedded.attractions[0].externalLinks.homepage){
            newObject.artistSiteUrl = TmObject._embedded.attractions[0].externalLinks.  homepage[0].url
        } 
        else if (TmObject._embedded.attractions) {
            newObject.artistSiteUrl = TmObject._embedded.attractions[0].url;
        } 
        else {
            newObject.artistSiteUrl = "";
            console.log("issue with ID: ", TmObject.id)
        }

    }

    return newObject;
}

module.exports = convertTmData;
function getArtists(req,res){
    const artists=req.songs.map((s)=>s.artist)
    const uniqueArtists=new Set (artists)
    const uArray=Array.from(uniqueArtists)
    res.json(uArray) 
}

module.exports = {getArtists} 

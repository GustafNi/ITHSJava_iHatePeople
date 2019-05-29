export default function GetPlaceName(index,placeType) {
    let ind = index
    let place = placeType.map((place, indexPlace) => {
      if (ind === indexPlace) {
        return place.shortName
      }
    }
    )
    return place
  }
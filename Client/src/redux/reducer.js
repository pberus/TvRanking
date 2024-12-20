import {
  GET_AIRING_TODAY_SERIES,
  GET_DISCOVER_FILMS,
  GET_DISCOVER_SERIES,
  GET_DISCOVER_TV,
  GET_GENRES,
  GET_LENGUAGES,
  GET_NOW_PLAYING_FILMS,
  GET_ON_THE_AIR_SERIES,
  GET_POPULAR_FILMS,
  GET_POPULAR_SERIES,
  GET_PROVIDERS,
  GET_TOP_RATED_FILMS,
  GET_TOP_RATED_SERIES,
  GET_UPCOMING_FILMS,
  REMOVE_TV,
  SEARCH_TV,
} from "./actions";

const initialState = {
  //FILMS
  nowPlayingFilms: [],
  popularFilms: [],
  topRatedFilms: [],
  upcomingFilms: [],
  //SERIES
  airingTodaySeries: [],
  onTheAirSeries: [],
  popularSeries: [],
  topRatedSeries: [],
  //DISCOVER
  discoverFilms: {},
  discoverSeries: {},
  discoverTv: [],
  //LENGUAGES
  lenguages: [],
  //GENRES
  genres: {},
  //PROVIDERS
  providers: {},
  //LISTS
  watchlist: [
    {
      id: 845781,
      title: "Red One",
      overview:
        "After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas.",
      image: "/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg",
      date: "2024-10-31",
      rating: 7,
      media_type: "movie",
    },
    {
      id: 912649,
      title: "Venom: The Last Dance",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      image: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      date: "2024-10-22",
      rating: 6.8,
      media_type: "movie",
    },
    {
      id: 1241982,
      title: "Moana 2",
      overview:
        "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
      image: "/khwDcPYD5xo6B8404mGGe6pYWtI.jpg",
      date: "2024-11-21",
      rating: 7,
      media_type: "movie",
    },
    {
      id: 1035048,
      title: "Elevation",
      overview:
        "A single father and two women venture from the safety of their homes to face monstrous creatures to save the life of a young boy.",
      image: "/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg",
      date: "2024-11-07",
      rating: 6.4,
      media_type: "movie",
    },
    {
      id: 762509,
      title: "Mufasa: The Lion King",
      overview:
        "Told in flashbacks, Mufasa is an orphaned cub, lost and alone until he meets a sympathetic lion named Taka—the heir to a royal bloodline. The chance meeting sets in motion a journey of misfits searching for their destiny and working together to evade a threatening and deadly foe.",
      image: "/lurEK87kukWNaHd0zYnsi3yzJrs.jpg",
      date: "2024-12-18",
      rating: 6.776,
      media_type: "movie",
    },
    {
      id: 974453,
      title: "Absolution",
      overview:
        "An aging ex-boxer gangster working as muscle for a Boston crime boss receives an upsetting diagnosis.  Despite a faltering memory, he attempts to rectify the sins of his past and reconnect with his estranged children. He is determined to leave a positive legacy for his grandson, but the criminal underworld isn’t done with him and won’t loosen their grip willingly.",
      image: "/cNtAslrDhk1i3IOZ16vF7df6lMy.jpg",
      date: "2024-10-31",
      rating: 6.1,
      media_type: "movie",
    },
    {
      id: 1138194,
      title: "Heretic",
      overview:
        "Two young missionaries are forced to prove their faith when they knock on the wrong door and are greeted by a diabolical Mr. Reed, becoming ensnared in his deadly game of cat-and-mouse.",
      image: "/5HJqjCTcaE1TFwnNh3Dn21be2es.jpg",
      date: "2024-10-31",
      rating: 7.201,
      media_type: "movie",
    },
    {
      id: 939243,
      title: "Sonic the Hedgehog 3",
      overview:
        "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
      image: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
      date: "2024-12-19",
      rating: 7.6,
      media_type: "movie",
    },
    {
      id: 1000075,
      title: "Largo Winch: Le prix de l'argent",
      overview:
        "Largo Winch, devastated by the kidnapping of his son, realizes that if he finds those responsible for his bankruptcy, maybe he'll see his son again.",
      image: "/hextHjNWD79MAJWux4ScvvzUdrR.jpg",
      date: "2024-07-31",
      rating: 5.5,
      media_type: "movie",
    },
    {
      id: 1184918,
      title: "The Wild Robot",
      overview:
        "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
      image: "/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
      date: "2024-09-08",
      rating: 8.4,
      media_type: "movie",
    },
    {
      id: 539972,
      title: "Kraven the Hunter",
      overview:
        "Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
      image: "/i47IUSsN126K11JUzqQIOi1Mg1M.jpg",
      date: "2024-12-11",
      rating: 5.7,
      media_type: "movie",
    },
    {
      id: 1005331,
      title: "Carry-On",
      overview:
        "An airport security officer races to outsmart a mysterious traveler forcing him to let a dangerous item slip onto a Christmas Eve flight.",
      image: "/sjMN7DRi4sGiledsmllEw5HJjPy.jpg",
      date: "2024-12-05",
      rating: 6.989,
      media_type: "movie",
    },
    {
      id: 1182387,
      title: "Armor",
      overview:
        "Armored truck security guard James Brody is working with his son Casey transporting millions of dollars between banks when a team of thieves led by Rook orchestrate a takeover of their truck to seize the riches. Following a violent car chase, Rook soon has the armored truck surrounded and James and Casey find themselves cornered onto a decrepit bridge.",
      image: "/685wCHwr2kyQZxvThNIM04HuuCt.jpg",
      date: "2024-10-30",
      rating: 5.5,
      media_type: "movie",
    },
    {
      id: 558449,
      title: "Gladiator II",
      overview:
        "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
      image: "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
      date: "2024-11-05",
      rating: 6.7,
      media_type: "movie",
    },
    {
      id: 933260,
      title: "The Substance",
      overview:
        "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
      image: "/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
      date: "2024-09-07",
      rating: 7.2,
      media_type: "movie",
    },
    {
      id: 1167271,
      title: "Weekend in Taipei",
      overview:
        "A former DEA agent and a former undercover operative revisit their romance during a fateful weekend in Taipei, unaware of the dangerous consequences of their past.",
      image: "/qSc0AUvs8mRy00R9y8QYEHWIAQ9.jpg",
      date: "2024-09-19",
      rating: 6.1,
      media_type: "movie",
    },
    {
      id: 1147416,
      title: "Miraculous World : Londres, la course contre le temps",
      overview:
        "To save the future from a terrible fate, Marinette becomes Chronobug and teams up with Bunnyx to defeat a mysterious opponent who travels through time. Who is this new supervillain, and why are they obsessed with exposing Marinette's secret superhero identity? Marinette's only hope is to defeat her new opponent to prevent the end of Ladybug and time itself!",
      image: "/6AtoMpHvs9pxd30KsyK8QmJ9W9M.jpg",
      date: "2024-11-14",
      rating: 7.9,
      media_type: "movie",
    },
    {
      id: 645757,
      title: "That Christmas",
      overview:
        "It's an unforgettable Christmas for the townsfolk of Wellington-on-Sea when the worst snowstorm in history alters everyone's plans — including Santa's.",
      image: "/bX6dx2U4hOk1esI7mYwtD3cEKdC.jpg",
      date: "2024-11-27",
      rating: 7.5,
      media_type: "movie",
    },
    {
      id: 1299652,
      title: "Watchmen: Chapter II",
      overview:
        "Suspicious of the events ensnaring their former colleagues, Nite Owl and Silk Spectre are spurred out of retirement to investigate. As they grapple with personal ethics, inner demons and a society turned against them, they race the clock to uncover a deepening plot that might trigger global nuclear war.",
      image: "/4rBObJFpiWJOG7aIlRrOUniAkBs.jpg",
      date: "2024-11-25",
      rating: 7.6,
      media_type: "movie",
    },
    {
      id: 1034541,
      title: "Terrifier 3",
      overview:
        "Five years after surviving Art the Clown's Halloween massacre, Sienna and Jonathan are still struggling to rebuild their shattered lives. As the holiday season approaches, they try to embrace the Christmas spirit and leave the horrors of the past behind. But just when they think they're safe, Art returns, determined to turn their holiday cheer into a new nightmare. The festive season quickly unravels as Art unleashes his twisted brand of terror, proving that no holiday is safe.",
      image: "/ju10W5gl3PPK3b7TjEmVOZap51I.jpg",
      date: "2024-10-09",
      rating: 6.9,
      media_type: "movie",
    },
  ],
  seen: [],
  liked: [],
  //
  miTv: [],
  tvDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //GET FILMS
    case GET_NOW_PLAYING_FILMS:
      return {
        ...state,
        nowPlayingFilms: payload,
      };
    case GET_POPULAR_FILMS:
      return {
        ...state,
        popularFilms: payload,
      };
    case GET_TOP_RATED_FILMS:
      return {
        ...state,
        topRatedFilms: payload,
      };
    case GET_UPCOMING_FILMS:
      return {
        ...state,
        upcomingFilms: payload,
      };
    //GET SERIES
    case GET_AIRING_TODAY_SERIES:
      return {
        ...state,
        airingTodaySeries: payload,
      };
    case GET_ON_THE_AIR_SERIES:
      return {
        ...state,
        onTheAirSeries: payload,
      };
    case GET_POPULAR_SERIES:
      return {
        ...state,
        popularSeries: payload,
      };
    case GET_TOP_RATED_SERIES:
      return {
        ...state,
        topRatedSeries: payload,
      };
    //DISCOVER
    case GET_DISCOVER_FILMS:
      return {
        ...state,
        discoverFilms: {
          results: payload.pageExists
            ? [...state.discoverFilms.results, ...payload.results]
            : payload.results,
          totalPages: payload.totalPages,
          totalResults: payload.totalResults,
        },
      };
    case GET_DISCOVER_SERIES:
      return {
        ...state,
        discoverSeries: {
          results: payload.pageExists
            ? [...state.discoverSeries.results, ...payload.results]
            : payload.results,
          totalPages: payload.totalPages,
          totalResults: payload.totalResults,
        },
      };
    case GET_DISCOVER_TV:
      return {
        ...state,
        discoverTv: payload,
      };
    //REMOVE TV
    case REMOVE_TV:
      return {
        ...state,
        [payload]: [],
      };
    //LENGUAGES
    case GET_LENGUAGES:
      return {
        ...state,
        lenguages: payload,
      };
    //GENRES
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    //PROVIDERS
    case GET_PROVIDERS:
      return {
        ...state,
        providers: payload,
      };
    //
    case SEARCH_TV:
      return {
        ...state,
        tvDetail: payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;

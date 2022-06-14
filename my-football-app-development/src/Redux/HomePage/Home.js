const FETCH_LEAGUES = 'store/home/FETCH_LEAGUES';
const SEARCH_LEAGUES = 'store/home/SEARCH_LEAGUES';
const initialState = [];

export const fetchLeagues = (leagues) => ({
  type: FETCH_LEAGUES,
  payload: leagues,
});

export const searchLeagues = (leagueName) => ({
  type: SEARCH_LEAGUES,
  payload: leagueName,
});

export const getLeagues = () => async (dispatch) => {
  const leagues = await fetch('https://api-football-standings.azharimm.site/leagues');
  const data = await leagues.json();
  dispatch(fetchLeagues(data.data));
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEAGUES:
      return action.payload.map((league) => (
        {
          leagueName: league.name,
          leagueLogo: league.logos.light,
          id: league.id,
          leagueAbbr: league.abbr,
          selected: false,
        }
      ));
    case SEARCH_LEAGUES:
      return state.filter((league) => league.leagueName.toLowerCase().includes(action.payload));
    default:
      return state;
  }
};

export default homeReducer;

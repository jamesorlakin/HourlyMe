import { createTabNavigator } from 'react-navigation'

import HomeScreen from './screens/home'
import HoursScreen from './screens/hours'
import OrganisationsScreen from './screens/organisations'

const screens = {
  home: {
    screen: HomeScreen
  },
  hours: {
    screen: HoursScreen
  },
  organisations: {
    screen: OrganisationsScreen
  }
}

const Navigation = createTabNavigator(screens)

export default Navigation

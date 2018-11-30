import { createStackNavigator } from 'react-navigation'

import HomeScreen from './screens/home'
import OrgManagementScreen from './screens/orgManagement'
import NewOrganisationScreen from './screens/organisations/new'
import AddHoursScreen from './screens/addHours'
import LocationPicker from './screens/locationPicker'

export default createStackNavigator({
  home: {
    screen: HomeScreen
  },
  manage: {
    screen: OrgManagementScreen
  },
  addHours: {
    screen: AddHoursScreen
  },
  new: {
    screen: NewOrganisationScreen
  },
  locationPicker: {
    screen: LocationPicker
  }
})

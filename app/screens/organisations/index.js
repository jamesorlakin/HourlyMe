import { createStackNavigator } from 'react-navigation'

import SelectOrganisation from './select'
import HomeScreen from '../home'
import NewOrganisationScreen from './new'

export default createStackNavigator({
  select: {
    screen: SelectOrganisation
  },
  selected: {
    screen: HomeScreen
  },
  new: {
    screen: NewOrganisationScreen
  }
})

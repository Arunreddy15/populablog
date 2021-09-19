// Write your code here
// import {Link} from 'react-router-dom'

import './index.css'

const LanguageFilterItem = props => {
  const {languageTabItem, updateTabId} = props
  const {id, language} = languageTabItem
  const onClickList = () => {
    updateTabId(id)
  }

  return (
    <li>
      <button type="button" onClick={onClickList}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

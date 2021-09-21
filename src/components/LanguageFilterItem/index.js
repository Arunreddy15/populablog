// Write your code here
// import {Link} from 'react-router-dom'

import './index.css'

const LanguageFilterItem = props => {
  const {languageTabItem, updateTabId, isActive} = props
  const {id, language} = languageTabItem
  const onClickList = () => {
    updateTabId(id)
  }
  const activeTabBtnClassName = isActive ? 'active-tab-btn' : ''

  return (
    <li>
      <button
        type="button"
        className={activeTabBtnClassName}
        onClick={onClickList}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

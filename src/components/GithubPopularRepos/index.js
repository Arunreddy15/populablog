import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    data: [],
  }

  componentDidMount() {
    this.getLanguages()
  }

  updateTabId = id => {
    this.setState({activeTab: id}, this.getLanguages)
  }

  getLanguages = async () => {
    const {activeTab} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const api = `https://apis.ccbp.in/popular-repos?language=${activeTab}`

    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
      const updatedData = fetchedData.popular_repos.map(eachDetail => ({
        id: eachDetail.id,
        avatarUrl: eachDetail.avatar_url,
        name: eachDetail.name,
        starsCount: eachDetail.stars_count,
        forksCount: eachDetail.forks_count,
        issuesCount: eachDetail.issues_count,
      }))
      this.setState({data: updatedData})
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDataSuccessView()
      case apiStatusConstants.failure:
        return this.renderDataFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderDataSuccessView = () => {
    const {data} = this.state

    return (
      <ul className="items-container">
        {data.map(each => (
          <RepositoryItem eachItem={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderDataFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="failure-image"
    />
  )

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {activeTab} = this.state
    return (
      <div className="app-container">
        <div className="container">
          <h1 className="top-title">Popular</h1>
          <ul className="language-filters">
            {languageFiltersData.map(eachFilter => (
              <LanguageFilterItem
                languageTabItem={eachFilter}
                key={eachFilter.id}
                updateTabId={this.updateTabId}
                isActive={activeTab === eachFilter.id}
              />
            ))}
          </ul>
          <div>{this.renderData()}</div>
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos

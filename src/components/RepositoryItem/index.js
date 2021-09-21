// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props

  const {avatarUrl, name, starsCount, forksCount, issuesCount} = eachItem

  return (
    <div className="card-container">
      <img src={avatarUrl} alt={name} className="book-image" />
      <h1 className="book-title">{name}</h1>
      <div>
        <div className="image-and-count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{starsCount}</p>
        </div>
        <div className="image-and-count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p>{forksCount}</p>
        </div>
        <div className="image-and-count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="issues-count"
          />
          <p>{issuesCount}</p>
        </div>
      </div>
    </div>
  )
}

export default RepositoryItem

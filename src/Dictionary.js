import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Delete from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const relatedLabel = "واژه های مربوط"
const detailsLabel = "توضیح/مثال"

const styles = {
  root: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  alphaContainer: {
    display: 'flex',
    justifyContent:'flex-start',
    flexFlow: 'wrap',
    marginTop: '2em'
  },
  listContainer: {
    display: 'flex',
    justifyContent:'flex-start',
    marginTop: '2em',
    flexDirection: 'column'
  },
  listItem: {
    borderBottom: '1px solid #cdcdcd'
  },
  meaningList: {

  },
  relatedButton: {
    padding: 3
  },
  inline: {
    display: 'inline-block',
    paddingLeft: 8
  },
  alphaButton: {margin:1, padding:'.1em', minWidth: '2.5em', maxHeight: '2.5em'}
};

function ListItem({item, classes, getRelatedLinks}) {
  const hasRelated = item.related.length > 0
  return (<div key={item.title} className={classes.listItem}>
    <Typography variant="h6">
      {item.title}
    </Typography>
    <ul className={classes.meaningList}>{
      item.meanings.map(meaning => {
        const pieces = meaning.split('*')
        const m = pieces.shift()
        const hasExamples = pieces.length > 0
        return <li>
          <Typography variant="subtitle2">{m}</Typography>
          {hasExamples && <React.Fragment>
             <Typography variant="body2" color="primary" className={classes.inline}>{`${detailsLabel}: `}</Typography>
             {pieces.map(ex => <Typography variant="body1"  className={classes.inline}>{ex.trim()}</Typography>)}
          </React.Fragment>}
        </li>})}
    </ul>
    { hasRelated && <React.Fragment>
          <Typography variant="body2" color="primary" className={classes.inline}>
          {`${relatedLabel}: `}
          </Typography>
          <Typography variant="subtitle1" className={classes.inline} >
          {getRelatedLinks(item.related, classes)}
          </Typography>
        </React.Fragment>
    }
    </div>)
}

class Dictionary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: null,
      searchItem: '',
      selectedAlphabet: ''
    }
  }
  componentDidMount() {
  }

  handleSearch = event => {
      if (event.target.value.length > 1) {
        this.setState({
          searchItem: event.target.value,
          items: this.getSearchItems(event.target.value),
          //selectedAlphabet: null
        })
      } else {
        this.setState({
          searchItem: event.target.value,
          items: null,
          //selectedAlphabet: null
        })
      }
  }

  handleRelated = value => {
        this.setState({
          searchItem: value,
          items: this.getSearchItems(value),
          //selectedAlphabet: null
        })
  }


  handleSelect = selectedAlphabet => {
    this.setState({
      selectedAlphabet,
      searchItem: '',
      items: this.getSelectItems(selectedAlphabet)
    })
  }

  getSearchItems = str => {
    const {master, classes} = this.props
    let found = []
    master.forEach(item => {
      const list = item.data
      if (list) {
        const foundItems = list.filter(l => l.title.indexOf(str) !== -1)
        found = found.concat(foundItems)
      }
    })
    return found.map(item => <ListItem item={item} classes={classes} getRelatedLinks={this.getRelatedLinks}/>)
  }

  getSelectItems = alpha => {
    const {master, classes} = this.props
    const list = master.find(l => l.index === alpha)
    if (list && list.data) {
      return list.data.map((item, index) => <ListItem item={item} classes={classes} getRelatedLinks={this.getRelatedLinks}/>)
    } else {
      return []
    }
  }

  getBar = selected => {
    const {classes, master} = this.props

    return master.map(item => <Button
            key={item.index}
            className={classes.alphaButton}
            variant={item.index === selected ? 'contained' : 'outlined'}
            size={'small'}
            color={item.index === selected ? 'secondary' : 'primary'}
            onClick={()=> this.handleSelect(item.index)}>
            {item.value}
        </Button>
      )
  }

  handleClearSearch = () => {
    const {selectedAlphabet} = this.state
    this.setState({searchItem: '',
      items: selectedAlphabet ? this.getSelectItems(selectedAlphabet) : null
    })
  }

  getRelatedLinks = (related, classes) => {
    const list = related.map((item, index) => <Button key={related+index} className={classes.relatedButton} onClick={() => this.handleRelated(item)}>{item}</Button>)
    return <div>{list}</div>
  }

  render() {
    const {classes} = this.props,
          {searchItem, selectedAlphabet, items} = this.state
    return (
        <div className={classes.root}>
          <Input
          placeholder='جستجوی واژه'
          onChange={this.handleSearch.bind(this)}
          value={searchItem}
          style={{maxWidth: 300}}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear"
                onClick={this.handleClearSearch.bind(this)}
              >
                {this.state.searchItem ? <Delete /> : null}
              </IconButton>
            </InputAdornment>
          }
          />
          <div className={classes.alphaContainer}>
          {this.getBar(selectedAlphabet)}
          </div>
          <div className={classes.listContainer}>
          {items}
          </div>
        </div>
    )
  }
}
export default withStyles(styles)(Dictionary)

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
    marginTop: '1em'
  },
  listContainer: {
    display: 'flex',
    justifyContent:'flex-start',
    marginTop: '1em',
    flexDirection: 'column'
  },
  listItem: {
    borderBottom: '1px solid #cdcdcd'
  },
  alphaButton: {margin:1, padding:'.1em', minWidth: '2.5em', maxHeight: '2.5em'}
};

function ListItem({item, classes}) {
  return (<div className={classes.listItem}>
    <Typography component="div" style={{ padding: 8 }}>
      {item.title}: {item.description}
    </Typography>
    {item.related && <Typography component="div" style={{ padding: 8 }}>
        {relatedLabel}: {item.related}
      </Typography> }
    {item.details && <Typography component="div" style={{ padding: 8 }}>
      {detailsLabel}: {item.details}
    </Typography>}
  </div>);
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
      if (event.target.value.length > 2) {
        this.setState({
          searchItem: event.target.value,
          items: this.getSearchItems(event.target.value),
          selectedAlphabet: null
        })
      } else {
        this.setState({
          searchItem: event.target.value,
          items: null,
          selectedAlphabet: null
        })
      }
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
    return found.map(item => <ListItem item={item} classes={classes}/>)
  }

  getSelectItems = alpha => {
    const {master, classes} = this.props
    const list = master.find(l => l.index === alpha)
    if (list && list.data) {
      return list.data.map(item => <ListItem item={item} classes={classes}/>)
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
    this.setState({searchItem: ''})
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

import React, { Component } from 'react';
import CourseItem from './courseItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Slider from '@mui/material/Slider';
import Tooltip from '../components/courseToolTip';
import { connect } from 'react-redux';

import axios from 'axios';

class InstructorCourses extends Component {
  //main courses are the ones we got on the post response. Courses are them but after the filters
  state = {
    keyword: '',
    page: 1,
    mainCourses: [],
    courses: [],
    priceRange: 10000,
    max:2000,
    ratingRange: [0, 5],
    subjects: [],
    filterFlag: false,
    subjectsFilter: {},
    rating: 1,
    symbol: '$',
    instructor: false
  };
  componentDidMount() {
    this.getSubjects();
    this.getInstructorCourses();


  }

  getRateSymbol = async () => {};
  getSubjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courses/subjects', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });

      this.setState({ subjects: res.data.subjects }, () => {
        this.state.subjects.forEach((subject) => {
          this.state.subjectsFilter[subject] = false;
        });
      });
    } catch (e) {}
  };


  submitSearch = async (keywordObj) => {
    const body = {keyword:this.state.keyword, 
                  instructor_id:'635d70dbf600410aab3c71b0',
                  page:this.state.page};

    try {
      const res = await axios.post('http://localhost:5000/courses/findCourse', body, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });


      this.setState({ courses: res.data, mainCourses: res.data }, () => {
        this.updateCourses();
      });
    } catch (e) {}
  };

  filterExists = (filters) => {
    var flag = false;
    Object.keys(filters).forEach((key) => {
      if (filters[key] === true) {
        flag = true;
      }
    });
    return flag;
  };
  handleFilterChange = (option) => {
    var newFlags = { ...this.state.subjectsFilter };
    if (newFlags[option]) {
      newFlags[option] = false;
    } else {
      newFlags[option] = true;
    }
    var flag = this.filterExists(newFlags);
    this.setState({ subjectsFilter: newFlags }, () => {
      this.setState({ filterFlag: flag }, () => {
        this.updateCourses();
      });
    });
  };
  getFilterComp = (filter, options) => {
    return (
      <div className="filters__filter-by">
        <div className="filters__filter-by__title">{filter}</div>
        <div className="filters__filter-by__options">
          {options.map((option, key) => {
            return (
              <div key={key} className="filters__filter-by__options__option">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.subjectsFilter.option}
                      onChange={() => this.handleFilterChange(option)}
                    />
                  }
                  label={option}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  handleSliderChange = (value) => {
 
    this.setState({ priceRange: value });
  };
  getPriceSlider = () => {
    var rate = this.props.rate.rate;

    // max price is 1000$
    return (
      <div className="filters__filter-by">
        <div className="filters__filter-by__title">Price</div>
        <div className="filters__filter-by__options">
          <Box sx={{ width: '100%', marginLeft: '10px' }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={this.state.priceRange * rate}
              valueLabelFormat={(value) => {
                return value === 0 ? 'Free' : Math.ceil(value) + this.props.rate.symbol;
              }}
              onChange={(event, value) => this.handleSliderChange(value / rate)}
              onChangeCommitted={this.updateCourses}
              valueLabelDisplay="auto"
              step={15 * rate}
              marks
              max={this.state.max * rate}
            />
          </Box>
        </div>
      </div>
    );
  };
  updateRating = (value) => {
    this.setState({ ratingRange: value });
  };

  removeCourse = (courses, course) => {
    var newArr = [];
    courses.forEach((courseItem) => {
      if (courseItem.title !== course) newArr.push(courseItem);
    });

    return newArr;
  };
  updateCourses = () => {
    var newCourses = [];

    if (this.state.filterFlag)
      this.state.mainCourses.forEach((course) => {
        if (this.state.subjectsFilter[course.subject] === true) {
          newCourses.push(course);
        }
      });
    else newCourses = [...this.state.mainCourses];

    newCourses.forEach((course) => {
      if (course.price * this.props.rate.rate > this.state.priceRange * this.props.rate.rate) {
        newCourses = this.removeCourse(newCourses, course.title);
      }
    });
    newCourses.forEach((course) => {
      if (
        !(course.rating >= this.state.ratingRange[0] && course.rating <= this.state.ratingRange[1])
      ) {
        newCourses = this.removeCourse(newCourses, course.title);
      }
    });

    this.setState({ courses: newCourses });
  };
  getRatingSlider = () => {
    return (
      <div className="filters__filter-by">
        <div className="filters__filter-by__title">Rating</div>
        <div className="filters__filter-by__options">
          <Box sx={{ width: '100%', marginLeft: '10px' }}>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={this.state.ratingRange}
              onChange={(event, value) => {
                this.updateRating(value);
              }}
              onChangeCommitted={this.updateCourses}
              valueLabelDisplay="auto"
              getAriaValueText={(value) => {
                return value;
              }}
              max={5}
            />
          </Box>
        </div>
      </div>
    );
  };
  handlePage = (value) => {
    this.setState({page:value}, ()=>{
        this.submitSearch()
    })
  };

  getInstructorCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users/instructor/viewCourse', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });

      this.setState({ courses: res.data, mainCourses: res.data }, () => {
        this.updateCourses();
      });
    } catch (e) {}
  };
  changeInput = (e)=>{

    this.setState({keyword:e.target.value})
  }
  render() {
    return (
      <div className="i-courses-container">

        <div className="i-search-bar">
            <input className="i-search-bar__input" type="text" placeholder="Search Your own courses" id="searchContent" value={this.state.searchContent} onChange={(e)=>this.changeInput(e)}/>
            <form className="i-search-bar__btn">
                <SearchIcon fontSize="large" onClick={this.submitSearch} />
            </form>
        </div>

        <div className="i-courses-container__main">

            <div className="filters">
                {this.getFilterComp('Subjects', this.state.subjects)}
                {this.getPriceSlider()}
            </div>

            <div className="right-side">
                <div className="courses">
                {this.state.courses.map((course, index) => {
                    return (
                    <div key={index}>
                        <Tooltip
                        course={course}
                        toolContent={<CourseItem type="i" key={index} course={course} />}
                        />
                    </div>
                    );
                })}
                {this.state.courses.length === 0 && (
                    <div className="courses__none">No Results were Found</div>
                )}
                </div>

                <div className="pagi">
                <Pagination
                    page={this.state.page}
                    onChange={(e, value) => {
                    this.handlePage(value);
                    }}
                    count={10}
                    color="primary"
                />
                </div>
            </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rate: state.rateAndSymbol
  };
};

export default connect(mapStateToProps)(InstructorCourses);

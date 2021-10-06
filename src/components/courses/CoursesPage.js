import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      alert("loading courses failed" + error);
    });
    this.props.actions.loadAuthors().catch((error) => {
      alert("loading authors failed" + error);
    });
  }
  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>

        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>

        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            // debugger;
            return {
              ...course,
              authorName: state.authors.find(
                (a) => a.id === course.authorId
                // debugger;
              ).name,
            };
          }),
  };
}

// mapDispatchToProps as a function
function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),// passing one action  to dispatch
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    }, // passing all the course actions
  };
}

// // mapDispatchToProps as an object
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse,
// };

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

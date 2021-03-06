import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";

import Post from "../../components/Post";
import Composer from "../../components/Composer";
import { postActions } from "../../redux/actions";

const SIDEBAR_BUTTONS = [
  {
    title: "Friends",
    icon: "users",
  },
  {
    title: "Events",
    icon: "calendar",
  },
  {
    title: "Groups",
    icon: "user-friends",
  },
  {
    title: "Pages",
    icon: "flag",
  },
  {
    title: "See More",
    icon: "angle-down",
  },
];

const SidebarButton = ({ title, icon }) => {
  return (
    <Button className="d-flex align-items-center sidebar-button border-0 text-dark btn-light">
      {" "}
      <FontAwesomeIcon icon={icon} size="lg" style={{ width: "4rem" }} />
      <span>{title}</span>
    </Button>
  );
};

/* STEP 3 */
export default function HomePage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const posts = useSelector((state) => state.post.posts)
  const dispatch = useDispatch();
  console.log(posts)

  useEffect(() => {
    dispatch(postActions.postsRequest())
  }, [dispatch]);

  if (!isAuthenticated) return <Redirect to="/auth" />;

  return (
    <Row>
      <Col className="d-flex flex-column pl-1 mt-3">
        <ButtonGroup vertical>
          {SIDEBAR_BUTTONS.map((b) => {
            return <SidebarButton key={b.title} {...b} />;
          })}
        </ButtonGroup>
      </Col>
      <Col
        xs={5}
        id="scrollingElement"
        className="d-flex flex-column align-items-center posts-container"
      >
        <Composer />
        {(posts && posts.map((p) => <Post key={p._id} {...p} /> ))}
      </Col>
      <Col></Col>
    </Row>
  );
}

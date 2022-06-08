import React from "react";
import { NavBar } from "./NavBar";

export function Profile() {
  return (
    <>
      <NavBar />
      <main>
        <div className="myList">
          <div className="title">
            <p>My List</p>
          </div>
        </div>
      </main>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon, Menu, List, Modal, Segment, Sidebar } from "semantic-ui-react";
import { getGit } from "../Actions/index";

function GitProject(props) {

    const getDate = (secs) => {
        let date = new Date(secs * 1000)
        date = date.toString()
        let n = date.lastIndexOf(":")
        let str = date.substring(0, n + 3)
        return str;
    }

    return (
        <div>
            {props.gitInfo &&
                <>
                    <h4><strong style={{ color: "#4183c4" }}>Latest Commit</strong> {getDate(props.gitInfo.committedOn)}</h4>
                    <List divided relaxed>
                        <List.Item>
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header >Commit shortHash</List.Header>
                                <List.Description >{props.gitInfo.shortHash}</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header >Branch</List.Header>
                                <List.Description >{props.gitInfo.branch}</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header >Commit Message</List.Header>
                                <List.Description >{props.gitInfo.subject}</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header >Author</List.Header>
                                <List.Description >{props.gitInfo.author.name}</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header >Email</List.Header>
                                <List.Description>{props.gitInfo.author.email}</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </>
            }
        </div >
    );
}
function mapStateToProps(state) {
    return {
        gitInfo: state.gitInfo
    };
}
const mapDispatchToProps = {
    getGit: getGit
};
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GitProject)
);

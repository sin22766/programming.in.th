import React from 'react'
import * as actionCreators from '../../redux/actions/index'
import { connect } from 'react-redux'
import { Table } from 'antd'
import styled from 'styled-components'
import { ColumnProps } from 'antd/lib/table'

const TableWrapper = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-bottom: 10px;
  padding: 10px 20px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-color: white;
`

class SubmissionsComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.onInitialLoad()
  }

  render() {
    const columns = [
      {
        title: 'User',
        dataIndex: 'username',
        width: 120,
        fixed: 'left'
      },
      {
        title: 'Problem',
        dataIndex: 'problem_id'
      },
      {
        title: 'Language',
        dataIndex: 'language'
      },
      {
        title: 'Status',
        dataIndex: 'status'
      },
      {
        title: 'Points',
        dataIndex: 'points'
      },
      {
        title: 'Time (s)',
        dataIndex: 'time'
      },
      {
        title: 'Memory (KB)',
        dataIndex: 'memory'
      }
    ] as ColumnProps<{}>[]
    return (
      <TableWrapper>
        <Table
          columns={columns}
          scroll={{ x: 800 }}
          dataSource={this.props.submissionsList}
          loading={this.props.submissionsListStatus === 'LOADING'}
        />
      </TableWrapper>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log(state)
  return {
    submissionsList: state.submissions.submissionsList,
    submissionsListStatus: state.submissions.submissionsListStatus
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onInitialLoad: () => {
      dispatch(actionCreators.loadSubmissionsList(10))
    }
  }
}

export const SubmissionsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionsComponent)

// TODO: handle pages of 10
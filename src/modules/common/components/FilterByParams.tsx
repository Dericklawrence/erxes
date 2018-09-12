import { DataWithLoader, EmptyState, Icon } from 'modules/common/components';
import { router } from 'modules/common/utils';
import { SidebarCounter, SidebarList } from 'modules/layout/styles';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Filter from './filterableList/Filter';

type Props = {
  history: any,
  fields: any[],
  counts: any,
  paramKey: string,
  icon?: string,
  loading: boolean,
  searchable?: boolean,
  update: () => void
};

type State = {
  key: string
}

const PopoverContent = styled.div`
  > input {
    padding: 10px 20px;
  }
`;

class FilterByParams extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      key: ''
    };

    this.filterItems = this.filterItems.bind(this);
  }

  filterItems(e) {
    this.setState({ key: e.target.value });
    this.props.update();
  }

  renderItems() {
    const { history, fields, counts, paramKey, icon, searchable } = this.props;
    const { key } = this.state;

    if (fields.length === 0) {
      return <EmptyState icon="clipboard-1" text="No templates" size="full" />;
    }

    return (
      <PopoverContent>
        {searchable && <Filter onChange={this.filterItems} />}
        <SidebarList>
          {fields.map(field => {
            // filter items by key
            if (key && field.name.toLowerCase().indexOf(key) < 0) {
              return false;
            }

            return (
              <li key={field._id}>
                <a
                  tabIndex={0}
                  className={
                    router.getParam(history, [paramKey]) === field._id
                      ? 'active'
                      : ''
                  }
                  onClick={() => {
                    router.setParams(history, { [paramKey]: field._id });
                  }}
                >
                  {icon ? (
                    <Icon icon={icon} style={{ color: field.colorCode }} />
                  ) : null}{' '}
                  {field.name}
                  <SidebarCounter>{counts[field._id]}</SidebarCounter>
                </a>
              </li>
            );
          })}
        </SidebarList>
      </PopoverContent>
    );
  }

  render() {
    const { fields, loading } = this.props;

    return (
      <DataWithLoader
        loading={loading}
        count={fields.length}
        data={this.renderItems()}
        emptyText="No tags"
        emptyIcon="tag"
        size="small"
        objective={true}
      />
    );
  }
}

export default withRouter(FilterByParams);
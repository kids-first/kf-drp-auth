import React from 'react';
import _ from 'lodash';
import { Table, Input } from 'semantic-ui-react';
import { compose } from 'recompose';
import { injectState } from 'freactal';

function normalizeRow({
  row,
  data,
  associated,
  stageChange,
  immutableKeys,
}: {
  row: string | { key: string; fieldName: any; fieldContent: any };
  data: Object[];
  associated: Object[];
  stageChange: Function;
  immutableKeys: string[];
}) {
  const rowData =
    typeof row === 'string'
      ? {
          key: row,
          fieldName: row,
          fieldContent: immutableKeys.includes(row) ? (
            data[row] || ''
          ) : (
            <Input
              size="mini"
              onChange={(e, { value }) => stageChange({ [row]: value })}
              type="text"
              value={data[row] || ''}
            />
          ),
        }
      : { ...row, fieldName: row.fieldName || row.key };

  return {
    ...rowData,
    fieldName:
      typeof rowData.key === 'function'
        ? rowData.key({ associated, data, editing: true, stageChange })
        : _.upperCase(rowData.key),
    fieldContent:
      typeof rowData.fieldContent === 'function'
        ? rowData.fieldContent({ associated, data, editing: true, stageChange })
        : rowData.fieldContent,
  };
}

const enhance = compose(injectState);

class EditingContentTable extends React.Component<any, any> {
  render() {
    const {
      rows,
      state: { staged, associated, immutableKeys },
      effects: { stageChange },
      hideImmutable,
    } = this.props;

    return (
      <Table basic="very" style={{ fontSize: 18 }}>
        <Table.Body>
          {rows
            .filter(field => !hideImmutable || !immutableKeys.includes(field.key || field))
            .map(row => {
              const { key, fieldName, fieldContent } = normalizeRow({
                row,
                data: staged,
                associated,
                stageChange,
                immutableKeys,
              });

              return (
                <Table.Row key={`${staged.id}-${key}`} style={{ verticalAlign: 'baseline' }}>
                  <Table.Cell
                    style={{
                      fontSize: '0.65em',
                      border: 'none',
                      textAlign: 'right',
                      width: '6em',
                    }}
                  >
                    {fieldName}
                  </Table.Cell>
                  <Table.Cell style={{ border: 'none' }}>{fieldContent}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    );
  }
}

export default enhance(EditingContentTable);

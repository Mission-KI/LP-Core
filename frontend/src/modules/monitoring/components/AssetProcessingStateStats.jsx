const AssetProcessingStateStats = ({ analytics }) => {
  return (
    <>
      <h4 className="bold mt-5 mb-4">Assets Per Processing State</h4>
      <table className="table table-bordered table-hover">
        <tbody>
          <tr>
            <th>Assets With Original Data</th>
            <td className="text-end">
              {analytics?.original_data_count?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>Assets With Processed Data</th>
            <td className="text-end">
              {analytics?.processed_data_count?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>Assets With Refined Data</th>
            <td className="text-end">
              {analytics?.refined_data_count?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>Assets With AI/ML result Data</th>
            <td className="text-end">
              {analytics?.aiml_result_data_count?.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AssetProcessingStateStats;

const PublishersList = ({ publishers }) => {
    return (
        <>
            <h4 className='bold mt-5 mb-4'>Publishers</h4>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Publisher</th>
                        <th className='text-end'>Number of EDP's</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers?.map(publisher => (
                        <tr key={publisher.key}>
                            <td>{publisher.key}</td>
                            <td className='text-end'>{publisher?.doc_count?.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default PublishersList;

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace BEDService.db
{
    public class ErrorDataSource : DBDataSource
    {
        public ErrorDataSource()
        {

        }

        public void AddError(int ID, string value)
        {
            using (SqlTransaction transaction = _connection.BeginTransaction())
            {
                try
                {
                    using (SqlCommand command = new SqlCommand("sp_insert_testerror", _connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.Transaction = transaction;

                        command.Parameters.Add(new SqlParameter("@ID", ID));
                        command.Parameters.Add(new SqlParameter("@value", string.IsNullOrWhiteSpace(value) ? Convert.DBNull : value));

                        command.ExecuteNonQuery();
                    }
                    transaction.Commit();

                }
                catch (Exception ex)
                {
                    if (transaction != null)
                        transaction.Rollback();

                    throw;
                }
            }
        }
    }
}
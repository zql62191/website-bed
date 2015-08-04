using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace BEDService.db
{
    public class DBDataSource : IDisposable
    {
        protected SqlConnection _connection;
        private static readonly object objectLock = new object();
        private bool _disposed;

        public DBDataSource()
        {
            _connection = Util.GetConnection();
            if (_connection != null)
                _connection.Open();

        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _connection.Dispose();
                }
                _disposed = true;
            }

        }

    }
}
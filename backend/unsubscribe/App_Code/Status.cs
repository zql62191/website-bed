using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Status
/// </summary>
public class Status
{
    private bool _SvcStatus;
    public bool SvcStatus {
        get
        {
            if (Errors.Count > 0)
                return false;
            else
                return true;
        }
        set
        {
            _SvcStatus = value;
        }
    }
    public List<string> Errors { get; set; }

    public Status()
    {
        Errors = new List<string>();
    }

}
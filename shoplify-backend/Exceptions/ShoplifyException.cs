using System.Net;

namespace shoplify_backend.Exceptions
{
    public class ShoplifyException : Exception
    {
        public HttpStatusCode StatusCode { get; }

        public ShoplifyException(string message, HttpStatusCode code)
            : base(message)
        {
            StatusCode = code;
        }
    }
}

using System.Text.Json.Serialization;

namespace DecentDiff.Code
{
    public class MonacoLanguage
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("extensions")]
        public List<string>? Extensions { get; set; }

        [JsonPropertyName("filenames")]
        public List<string>? Filenames { get; set; }

        [JsonPropertyName("aliases")]
        public List<string>? Aliases { get; set; }

        [JsonPropertyName("mimetypes")]
        public List<string>? MimeTypes { get; set; }

        [JsonPropertyName("firstLine")]
        public string? FirstLine { get; set; }
    }
}

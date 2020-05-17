using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net.Http;
using System.Threading.Tasks;

namespace cd_parser.Controllers
{
	[Route("api")]
	[ApiController]
	public class ParseController : ControllerBase
	{

		private IConfiguration _configuration;

		public ParseController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[HttpGet]
		[Route("parse")]
		public async Task<ActionResult> Parse(string pickCity, string pickState, string destCity, string destState, string token)
		{
			if (string.IsNullOrWhiteSpace(pickCity) || string.IsNullOrWhiteSpace(pickState) || string.IsNullOrWhiteSpace(destCity) || string.IsNullOrWhiteSpace(destState)
				  || string.IsNullOrWhiteSpace(token))
			{
				return BadRequest("Some or all search parameters are not specified");
			}

			using (var client = new HttpClient())
			{
				client.DefaultRequestHeaders.Add("Cookie", $"PHPSESSID=9578ac510a80bed7bee97fa5f8879326; test-session=1; CSRF_TOKEN={token}; visitedDashboard=1; bm_mi=E846A7F45CD84C7C31301C34F4D8B5A6~5bh1PfIhJFHGGL+MOCYB2hNRbK30/2EmWi0828oTaTGx9hP5QIkcE373bZpKigRCX3SyIW/K5dsCPinI/mGv2WEuJqXL69MuOU6oVYIj8zhrtVH2HgRpySZf87a9cQzMj3wui2hJbO5qhfmSMB+iMZEdtN9ivmzjJi7O9AqGDgW2lTdHcJCQSXVDMw2IU9+KwlcKT4NY8KkyYInGw4JCCFzrQq86wh5VPtZ8YQeFBK2Jpy33ebOdPqfPt+8++oX9k4vypGYQUj7HNJ18QL4E/Ve4AKVS1xIMWcYQwUQ4Shs=; _ga=GA1.1.168095745.1586595847; _gid=GA1.1.1766872811.1586595847; ak_bmsc=4D830C3EF5533F995FDB2D5A3A22972A6855F935F36F0000EC87915E4EF0182C~plqeBbycrqSCbBlB2v+NxnVOT78j0jKbipKxJdqiFyq+Js9HG9c4znyXmuTY3LPsG2pGwJ7EpwC5aixC9DBK/4zq4HkpLt0UP76DsLZOM5BDfh1d1055LHT3j1Viz+SKwRD/zwO3STxOFyLzoa6mXl7vn/jRmM1Ru1F8moVp0fwurCkj5swmUS2ma9bzWynIdD6mUP92io9l0fKRviQYPKd2Qjmsd4YN1RKGV8FrCzINhbJHCd99Zxn1bEMqz/EFIQ; defaultView=list; QSI_HistorySession=https%3A%2F%2Fwww.centraldispatch.com%2Fprotected%2F~1586595847705%7Chttps%3A%2F%2Fwww.centraldispatch.com%2Fprotected%2Flisting-search~1586595875521%7Chttps%3A%2F%2Fwww.centraldispatch.com%2Fprotected%2Flisting-along-route%2Fresult%3FrouteBased%3D0%26corridorWidth%3D0%26routePickupCity%3D%26routePickupState%3D%26routePickupZip%3D%26route_origination_valid%3D1%26routeDeliveryCity%3D%26routeDeliveryState%3D%26routeDeliveryZip%3D%26route_destination_valid%3D1%26waypointCity%255B%255D%3D%26waypointCity%255B%255D%3D%26waypointCity%255B%255D%3D%26waypointCity%255B%255D%3D%26waypointCity%255B%255D%3D%26waypointState%255B%255D%3D%26waypointState%255B%255D%3D%26waypointState%255B%255D%3D%26waypointState%255B%255D%3D%26waypointState%255B%255D%3D%26waypointZip%255B%255D%3D%26waypointZip%255B%255D%3D%26waypointZip%255B%255D%3D%26waypointZip%255B%255D%3D%26waypointZip%255B%255D%3D%26waypoint_valid%3D1%26pickupCity%3DChicago%26pickupRadius%3D100%26pickupState%3DIL%26pickupZip%3D%26pickupAreas%255B%255D%3DAll%26origination_valid%3D1%26deliveryCity%3DNewark%26deliveryRadius%3D100%26deliveryState%3DNJ%26deliveryZip%3D%26deliveryAreas%3D%26destination_valid%3D1%26FatAllowCanada%3D1%26vehicleTypeIds%255B%255D%3D%26trailerType%3D%26vehiclesRun%3D%26minVehicles%3D1%26maxVehicles%3D%26shipWithin%3D1%26paymentType%3D%26minPayPrice%3D250%26minPayPerMile%3D0.40%26highlightOnTop%3D1%26postedBy%3D%26highlightPeriod%3D4%26listingsPerPage%3D100%26primarySort%3D9%26secondarySort%3D4%26filterBlocked%3D1%26CSRFToken%3D4209690b06efe647d15006e0f3b204e32bfee8b804cecf2cc23679ef4d6c13b0%26highlightPreferred%3D1%26pickupCitySearch%3D1%26deliveryCitySearch%3D1~1586596234794; bm_sv=F5235472C6643DACDD5ACBCB26506F16~3g4eCb/mb/H6ZWrAtrfQF0cwU6v4JlKViCTXF2oEsr5bOeGbcN9jTruFCpGI2l8lAmy36EqPDKrEYx/mhxVyTPZUGWxwPewubVAOerU17jQRv/FcCXDinhGldsDnBAACSLq1iR4iD2N/ASwZeejEwJxlHxKLeoltzwStFTpfZW4=; _uiq_id.705106101.8c7c=44f3b8933ebdec29.1586595847.0.1586597440..; _gat_UA-128124542-1=1");
				var res = await client.GetAsync($"https://www.centraldispatch.com/protected/listing-search/get-results-ajax?routeBased=0&corridorWidth=0&routePickupCity=&routePickupState=&routePickupZip=&route_origination_valid=1&routeDeliveryCity=&routeDeliveryState=&routeDeliveryZip=&route_destination_valid=1&waypointCity%5B%5D=&waypointCity%5B%5D=&waypointCity%5B%5D=&waypointCity%5B%5D=&waypointCity%5B%5D=&waypointState%5B%5D=&waypointState%5B%5D=&waypointState%5B%5D=&waypointState%5B%5D=&waypointState%5B%5D=&waypointZip%5B%5D=&waypointZip%5B%5D=&waypointZip%5B%5D=&waypointZip%5B%5D=&waypointZip%5B%5D=&waypoint_valid=1&pickupCity={pickCity}&pickupRadius=100&pickupState={pickState}&pickupZip=&pickupAreas%5B%5D=All&origination_valid=1&deliveryCity={destCity}&deliveryRadius=100&deliveryState={destState}&deliveryZip=&deliveryAreas=&destination_valid=1&FatAllowCanada=1&vehicleTypeIds%5B%5D=&trailerType=&vehiclesRun=&minVehicles=1&maxVehicles=&shipWithin=1&paymentType=&minPayPrice=250&minPayPerMile=0.40&highlightOnTop=1&postedBy=&highlightPeriod=1&listingsPerPage=100&primarySort=9&secondarySort=4&filterBlocked=1&CSRFToken={token}&highlightPreferred=1&pickupCitySearch=1&deliveryCitySearch=1&route_search=true&pageStart=0&pageSize=100&template=1&username=usapat");
				if (res.IsSuccessStatusCode)
				{
					return Ok(await res.Content.ReadAsStringAsync());
				}
				else
				{
					return NotFound("Error");
				}
			}
		}

		[HttpPost]
		[Route("sendmail")]
		public async void Send([FromBody] EmailInfo emailInfo)
		{
			var apiKey = _configuration["SENDGRID_API_KEY"];

			var client = new SendGridClient(apiKey);
			var msg = new SendGridMessage()
			{
				From = new EmailAddress("cdparser@gmail.com", "CD Parser"),
				Subject = $"New Car! {emailInfo.CarModel} for {emailInfo.Price}.",
				PlainTextContent = $"Car info. From {emailInfo.Pickup} to {emailInfo.Destination}; Phone: {emailInfo.Phone} Model: {emailInfo.CarModel}; Price {emailInfo.Price}; Price per mile: {emailInfo.PricePerMile}."
			};
			msg.AddTo(new EmailAddress(emailInfo.SendTo));
			var response = await client.SendEmailAsync(msg);
		}
	}
}

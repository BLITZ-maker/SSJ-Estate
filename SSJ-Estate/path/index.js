import Log from "../../logic/log.js";

export default function () {
	const operations = {
		GET,
		POST,
		PUT,
		DELETE,
	};

	function POST(req, res) {
		Log.i(`About to create property: ${JSON.stringify(req.body)}`);
		// Add logic to create a new property in the portfolio
		res.status(201).send();
	}
	function PUT(req, res) {
		Log.i(`About to update property id: ${req.query.id}`);
		// Add logic to update the details of a property in the portfolio
		res.status(200).send();
	}
	
	function DELETE(req, res) {
		Log.i(`About to delete property id: ${req.query.id}`);
		// Add logic to delete a property from the portfolio
		res.status(200).send();
	}
	
	function POST(req, res) {
		Log.i(`About to add tenant to property id: ${req.query.id}`);
		// Add logic to add a tenant to a property in the portfolio
		res.status(201).send();
	}
	
	function PUT(req, res) {
		Log.i(`About to update tenant id: ${req.query.id}`);
		// Add logic to update the details of a tenant in a property in the portfolio
		res.status(200).send();
	}
	
	function DELETE(req, res) {
		Log.i(`About to delete tenant id: ${req.query.id}`);
		// Add logic to delete a tenant from a property in the portfolio
		res.status(200).send();
	}

	function POST(req, res) {
		Log.i(`About to assign tenant to property id: ${req.query.id}`);
		// Add logic to assign a tenant to a property in the portfolio
		res.status(201).send();
	}

	function POST(req, res) {
		Log.i(`About to record rent payment for tenant id: ${req.query.id}`);
		// Add logic to record rent payment and generate rent invoices
		res.status(201).send();
	}

	function GET(req, res) {
		Log.i(`Fetching rent statements for property id: ${req.query.id}`);
		// Add logic to fetch rent statements for a property
		res.status(200).json(/* rent statements data */);
	}

	function POST(req, res) {
		Log.i(`About to record maintenance expense for property id: ${req.query.id}`);
		// Add logic to record maintenance expense for a property
		res.status(201).send();
	}
	

	GET.apiDoc = {
		summary: "Fetch item.",
		operationId: "getItems",
		responses: {
			200: {
				description: "List of items.",
				schema: {
					type: "array",
					items: {
						$ref: "#/definitions/Item",
					},
				},
			},
		},
	};

	POST.apiDoc = {
		summary: "Create item.",
		operationId: "createItem",
		consumes: ["application/json"],
		parameters: [
			{
				in: "body",
				name: "item",
				schema: {
					$ref: "#/definitions/Item",
				},
			},
		],
		responses: {
			201: {
				description: "Created",
			},
		},
	};

	PUT.apiDoc = {
		summary: "Update item.",
		operationId: "updateItem",
		parameters: [
			{
				in: "query",
				name: "id",
				required: true,
				type: "string",
			},
			{
				in: "body",
				name: "item",
				schema: {
					$ref: "#/definitions/Item",
				},
			},
		],
		responses: {
			200: {
				description: "Updated ok",
			},
		},
	};

	DELETE.apiDoc = {
		summary: "Delete item.",
		operationId: "deleteItem",
		consumes: ["application/json"],
		parameters: [
			{
				in: "query",
				name: "id",
				required: true,
				type: "string",
			},
		],
		responses: {
			200: {
				description: "Delete",
			},
		},
	};

	return operations;
}

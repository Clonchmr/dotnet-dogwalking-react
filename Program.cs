using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

var builder = WebApplication.CreateBuilder(args);

List<Dog> dogs = new List<Dog>()
{
    new Dog()
    {
        Id = 1,
        Name = "Sheldon",
        WalkerId = 1,
        CityId = 1,
        BreedId = 1
    },
    new Dog()
    {
        Id = 2,
        Name = "Spot",
        WalkerId = 2,
        CityId = 1,
        BreedId = 2
    },
    new Dog()
    {
        Id = 3,
        Name = "Ralph",
        WalkerId = 3,
        CityId = 2,
        BreedId = 3
    },
    new Dog()
    {
        Id = 4,
        Name = "Maxx",
        WalkerId = 1,
        CityId = 3,
        BreedId = 4
    }
};

List<Walker> walkers = new List<Walker>()
{
    new Walker()
    {
        Id = 1,
        Name = "Matthew Mercer"
    },
    new Walker()
    {
        Id = 2,
        Name = "Sarah McClain"
    },
    new Walker()
    {
        Id = 3,
        Name = "Bethany Carmichael"
    },
    new Walker()
    {
        Id = 4,
        Name = "Brad Norseman"
    }
};

List<City> cities = new List<City>()
{
    new City()
    {
        Id = 1,
        Name = "Chicago"
    },
    new City()
    {
        Id = 2,
        Name = "Indianapolis"
    },
    new City()
    {
        Id = 3,
        Name = "Minneapolis"
    },
    new City()
    {
        Id = 4,
        Name = "Pittsburgh"
    }
};

List<WalkerCity> walkerCities = new List<WalkerCity>()
{
    new WalkerCity()
    {
        Id = 1,
        WalkerId = 1,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 2,
        WalkerId = 1,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 3,
        WalkerId = 2,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 4,
        WalkerId = 3,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 5,
        WalkerId = 4,
        CityId = 4
    },
    new WalkerCity()
    {
        Id = 6,
        WalkerId = 3,
        CityId = 4
    }
};

List<Breed> breeds = new List<Breed>()
{
    new Breed()
    {
        Id = 1,
        Type = "Husky"
    },
    new Breed()
    {
        Id = 2,
        Type = "Lab"
    },
    new Breed()
    {
        Id = 3,
        Type = "Collie"
    },
    new Breed()
    {
        Id = 4,
        Type = "Bulldog"
    }
};



// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () =>
{
    
    return dogs.Select(d => 
    {
        Walker dogWalker = walkers.FirstOrDefault(w => w.Id == d.WalkerId);
        City dogCity = cities.FirstOrDefault(c => c.Id == d.CityId);
        Breed dogBreed = breeds.FirstOrDefault(b => b.Id == d.BreedId);

        return new DogDTO
        {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        Walker = new WalkerDTO
        {
            Id = dogWalker.Id,
            Name = dogWalker.Name
        },
        CityId = d.CityId,
        City = new CityDTO
        {
            Id = dogCity.Id,
            Name = dogCity.Name
        },
        BreedId = d.BreedId,
        Breed = new BreedDTO
        {
            Id = dogBreed.Id,
            Type = dogBreed.Type
        }
        };
    });
});


app.Run();

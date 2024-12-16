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

//-------------> GET Requests <------------

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
        Walker = d.WalkerId == null ? null : new WalkerDTO
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

app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dog selectedDog = dogs.FirstOrDefault(d => d.Id == id);
    Walker dogWalker = walkers.FirstOrDefault(w => w.Id == selectedDog.WalkerId);
    City dogCity = cities.FirstOrDefault(c => c.Id == selectedDog.CityId);
    Breed dogBreed = breeds.FirstOrDefault(b => b.Id == selectedDog.BreedId);

    if (selectedDog == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(
        new DogDTO
        {
            Id = selectedDog.Id,
            Name = selectedDog.Name,
            WalkerId = selectedDog.WalkerId,
            Walker = selectedDog.WalkerId == null ? null : new WalkerDTO
            {
                Id = dogWalker.Id,
                Name = dogWalker.Name
            },
            CityId = selectedDog.CityId,
            City = new CityDTO
            {
                Id = dogCity.Id,
                Name = dogCity.Name
            },
            BreedId = selectedDog.BreedId,
            Breed = new BreedDTO
            {
                Id = dogBreed.Id,
                Type = dogBreed.Type
            }
        }
    );
});

app.MapGet("/api/breeds", () =>
{
    return breeds.Select(b => new BreedDTO
    {
        Id = b.Id,
        Type = b.Type
    });
});

app.MapGet("/api/cities", () => 
{
    return cities.Select(c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});

app.MapGet("/api/walkers", () =>  
{
    return walkers.Select(w => 
    {
        List<Dog> walkerDogs = dogs.Where(d => d.WalkerId == w.Id).ToList();
        List<WalkerCity> walkersCities = walkerCities.Where(wc => wc.WalkerId == w.Id).ToList();

        return new WalkerDTO 
        {
            Id = w.Id,
            Name = w.Name,
            Dogs = walkerDogs.Count == 0 ? null : walkerDogs.Select(wd => new DogDTO
            {
                Id = wd.Id,
                Name = wd.Name,
                WalkerId = w.Id,
                CityId = wd.CityId,
                BreedId = wd.BreedId
            }).ToList(),
            WalkerCities = walkersCities.Select(wc => new WalkerCityDTO
            {
                Id = wc.Id,
                WalkerId = wc.WalkerId,
                CityId = wc.CityId
            }).ToList()
            
        };
    }).ToList();
});

// --------------->POST Requests<------------------

app.MapPost("/api/dogs", (Dog dog) => 
{
    dog.Id = dogs.Max(d => d.Id) + 1;
    dogs.Add(dog);

    return Results.Created($"/api/dogs/{dog.Id}", new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        BreedId = dog.BreedId
    });
    
});

app.MapPost("/api/breeds", (Breed breed) =>
{
    breed.Id = breeds.Max(b => b.Id) + 1;
    breeds.Add(breed);

    return Results.Created($"/api/breeds/{breed.Id}", new BreedDTO
    {
        Id = breed.Id,
        Type = breed.Type
    });
});

app.MapPost("/api/dogs/{id}/assign" , (int id, int walkerId) =>
{
    Dog dogToAssign = dogs.FirstOrDefault(d => d.Id == id);

    if(dogToAssign == null)
    {
        return Results.NotFound();
    }

    dogToAssign.WalkerId = walkerId;
    return Results.NoContent();
});

    app.MapPost("/api/cities", (City city) =>
    {
        city.Id = cities.Max(c => c.Id) + 1;
        cities.Add(city);

        return Results.Created($"/api/cities/{city.Id}", new CityDTO 
        {
            Id = city.Id,
            Name = city.Name
        });
        

        
    });


app.Run();

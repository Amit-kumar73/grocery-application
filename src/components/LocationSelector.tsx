import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Uttar Pradesh Districts and their major cities
const upLocations = {
  'Agra': ['Agra', 'Fatehpur Sikri', 'Firozabad'],
  'Aligarh': ['Aligarh', 'Khair', 'Atrauli'],
  'Allahabad': ['Prayagraj', 'Kaushambi', 'Phulpur'],
  'Ambedkar Nagar': ['Akbarpur', 'Tanda', 'Bhiti'],
  'Amethi': ['Gauriganj', 'Jagdishpur', 'Tiloi'],
  'Amroha': ['Amroha', 'Hasanpur', 'Naugawan Sadat'],
  'Auraiya': ['Auraiya', 'Bidhuna', 'Ajitmal'],
  'Azamgarh': ['Azamgarh', 'Nizamabad', 'Phulpur'],
  'Baghpat': ['Baghpat', 'Baraut', 'Khekra'],
  'Bahraich': ['Bahraich', 'Kaiserganj', 'Mahsi'],
  'Ballia': ['Ballia', 'Rasra', 'Bairiya'],
  'Balrampur': ['Balrampur', 'Tulsipur', 'Gainsari'],
  'Banda': ['Banda', 'Atarra', 'Baberu'],
  'Barabanki': ['Barabanki', 'Faizabad', 'Haidergarh'],
  'Bareilly': ['Bareilly', 'Aonla', 'Baheri'],
  'Basti': ['Basti', 'Harraiya', 'Rudhauli'],
  'Bhadohi': ['Bhadohi', 'Gyanpur', 'Aurai'],
  'Bijnor': ['Bijnor', 'Nagina', 'Chandpur'],
  'Budaun': ['Budaun', 'Gunnaur', 'Dataganj'],
  'Bulandshahr': ['Bulandshahr', 'Khurja', 'Sikandrabad'],
  'Chandauli': ['Chandauli', 'Chakia', 'Sakaldiha'],
  'Chitrakoot': ['Chitrakoot', 'Karvi', 'Mau'],
  'Deoria': ['Deoria', 'Rudrapur', 'Barhaj'],
  'Etah': ['Etah', 'Kasganj', 'Aliganj'],
  'Etawah': ['Etawah', 'Bharthana', 'Chakarnagar'],
  'Faizabad': ['Ayodhya', 'Milkipur', 'Bikapur'],
  'Farrukhabad': ['Farrukhabad', 'Fatehgarh', 'Mohammadabad'],
  'Fatehpur': ['Fatehpur', 'Bindki', 'Khaga'],
  'Firozabad': ['Firozabad', 'Tundla', 'Jasrana'],
  'Gautam Buddha Nagar': ['Noida', 'Greater Noida', 'Dadri'],
  'Ghaziabad': ['Ghaziabad', 'Modi Nagar', 'Muradnagar'],
  'Ghazipur': ['Ghazipur', 'Jaunpur', 'Mohammadabad'],
  'Gonda': ['Gonda', 'Colonelganj', 'Tarabganj'],
  'Gorakhpur': ['Gorakhpur', 'Campierganj', 'Sahjanwa'],
  'Hamirpur': ['Hamirpur', 'Maudaha', 'Sarila'],
  'Hapur': ['Hapur', 'Pilkhuwa', 'Garhmukteshwar'],
  'Hardoi': ['Hardoi', 'Shahabad', 'Sawayajpur'],
  'Hathras': ['Hathras', 'Sadabad', 'Sikandra Rao'],
  'Jalaun': ['Orai', 'Kalpi', 'Konch'],
  'Jaunpur': ['Jaunpur', 'Machhlishahr', 'Kerakat'],
  'Jhansi': ['Jhansi', 'Lalitpur', 'Mauranipur'],
  'Kannauj': ['Kannauj', 'Chhibramau', 'Talgram'],
  'Kanpur Dehat': ['Akbarpur', 'Bhognipur', 'Derapur'],
  'Kanpur Nagar': ['Kanpur', 'Kalyanpur', 'Chakeri'],
  'Kasganj': ['Kasganj', 'Patiyali', 'Amapur'],
  'Kaushambi': ['Manjhanpur', 'Sirathu', 'Chail'],
  'Kheri': ['Lakhimpur Kheri', 'Palia', 'Mohammadi'],
  'Kushinagar': ['Padrauna', 'Kasya', 'Tamkuhi Raj'],
  'Lalitpur': ['Lalitpur', 'Mehroni', 'Talbehat'],
  'Lucknow': ['Lucknow', 'Malihabad', 'Mohanlalganj'],
  'Maharajganj': ['Maharajganj', 'Pharenda', 'Paniyara'],
  'Mahoba': ['Mahoba', 'Kulpahar', 'Charkhari'],
  'Mainpuri': ['Mainpuri', 'Bewar', 'Bhongaon'],
  'Mathura': ['Mathura', 'Vrindavan', 'Chhata'],
  'Mau': ['Mau', 'Ghosi', 'Madhuban'],
  'Meerut': ['Meerut', 'Mawana', 'Sardhana'],
  'Mirzapur': ['Mirzapur', 'Chunar', 'Marihan'],
  'Moradabad': ['Moradabad', 'Thakurdwara', 'Bilari'],
  'Muzaffarnagar': ['Muzaffarnagar', 'Shamli', 'Kairana'],
  'Pilibhit': ['Pilibhit', 'Puranpur', 'Bisalpur'],
  'Pratapgarh': ['Pratapgarh', 'Kunda', 'Patti'],
  'Raebareli': ['Raebareli', 'Lalganj', 'Unchahar'],
  'Rampur': ['Rampur', 'Bilaspur', 'Milak'],
  'Saharanpur': ['Saharanpur', 'Deoband', 'Nakur'],
  'Sambhal': ['Sambhal', 'Chandausi', 'Gunnaur'],
  'Sant Kabir Nagar': ['Khalilabad', 'Maghar', 'Mehdawal'],
  'Shahjahanpur': ['Shahjahanpur', 'Tilhar', 'Jalalabad'],
  'Shamli': ['Shamli', 'Kairana', 'Thanabhawan'],
  'Shravasti': ['Bhinga', 'Ikauna', 'Jamunaha'],
  'Siddharthnagar': ['Naugarh', 'Itwa', 'Jogia'],
  'Sitapur': ['Sitapur', 'Biswan', 'Laharpur'],
  'Sonbhadra': ['Robertsganj', 'Dudhi', 'Chopan'],
  'Sultanpur': ['Sultanpur', 'Kadipur', 'Gauriganj'],
  'Unnao': ['Unnao', 'Hasanganj', 'Safipur'],
  'Varanasi': ['Varanasi', 'Pindra', 'Cholapur']
};

interface LocationSelectorProps {
  value: string;
  onLocationChange: (location: string) => void;
}

export const LocationSelector = ({ value, onLocationChange }: LocationSelectorProps) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedCity('');
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleConfirm = () => {
    if (selectedCity && selectedDistrict) {
      const location = `${selectedCity}, ${selectedDistrict}`;
      onLocationChange(location);
      setIsOpen(false);
    }
  };

  const handleCurrentLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use a reverse geocoding service (using a free service)
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (response.ok) {
            const data = await response.json();
            const city = data.city || data.locality || 'Unknown City';
            const district = data.principalSubdivision || 'Unknown District';
            
            // Check if the detected location is in UP
            const upDistricts = Object.keys(upLocations);
            const matchedDistrict = upDistricts.find(d => 
              d.toLowerCase().includes(district.toLowerCase()) || 
              district.toLowerCase().includes(d.toLowerCase())
            );
            
            if (matchedDistrict) {
              const location = `${city}, ${matchedDistrict}`;
              onLocationChange(location);
              setIsOpen(false);
            } else {
              alert('Current location detected outside Uttar Pradesh. Please select manually.');
            }
          } else {
            alert('Could not detect location. Please select manually.');
          }
        } catch (error) {
          alert('Error detecting location. Please select manually.');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        alert('Error accessing location. Please select manually.');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 max-w-[200px] truncate"
        >
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="truncate text-sm">{value}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Your Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <Button
              variant="outline"
              onClick={handleCurrentLocation}
              disabled={isLocating}
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span>{isLocating ? 'Detecting...' : 'Use Current Location'}</span>
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or select manually
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>District</Label>
            <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {Object.keys(upLocations).map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedDistrict && (
            <div className="space-y-2">
              <Label>City</Label>
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {upLocations[selectedDistrict as keyof typeof upLocations]?.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedCity || !selectedDistrict}
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};